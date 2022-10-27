self.importScripts('./spark-md5.min.js'); // 导入脚本

// 生成文件 hash
self.onmessage = (e) => {
	const { fileChunkList } = e.data;
	const spark = new self.SparkMD5.ArrayBuffer();
	let percentage = 0; // 读取的 百分比
	let count = 0;
	const loadNext = (index) => {
		const reader = new FileReader();

		// 读取这个文件的第一个切片
		reader.readAsArrayBuffer(fileChunkList[index].file); // file为 file.slic(xx,xx)的结果
		// 读取单个切片的buffer
		reader.onload = (e) => {
			count++;
			spark.append(e.target.result);
			if (count === fileChunkList.length) {
				//如果切片递归完成了
				self.postMessage({
					percentage: 100, // 百分之百
					hash: spark.end(), // 计算文件的完整hash
				});
				self.close();
			} else {
				percentage += 100 / fileChunkList.length;
				self.postMessage({
					percentage,
				});
				loadNext(count); //递归切片
			}
		};
	};

	loadNext(0);
};
