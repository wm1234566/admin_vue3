import Sortable from 'sortablejs';
import { updateArticleSort } from '@/utilities/Request';
import i18n from '../../i18n/index';
import { ref } from 'vue';
export const toRefTable = ref(null);

export const initSortable = (currentPage4, pageSize4, tableData, getData) => {
	// 1.要拖拽的元素

	const el = toRefTable.value.$el.querySelector('.el-table__body-wrapper   table  tbody');

	//    console.log("数据",toRefTable,toRefTable.value.$el);
	//   console.log('数据2',el);

	if (el) {
		Sortable.create(el, {
			ghostClass: 'sortable-ghost', //  被拖拽的的类名
			chosenClass: 'sortable-chosen', // 被选中项的css 类名
			dragClass: 'sortable-drag', // 正在被拖拽中的css类名

			// 结束拖拽
			onEnd: function (/**Event*/ evt) {
				// var itemEl = evt.item;  // dragged HTMLElement
				// evt.to;    // target list
				// evt.from;  // previous list
				// evt.oldIndex;  // element's old index within old parent
				// evt.newIndex;  // element's new index within new parent
				// evt.clone // the clone element
				// evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
				// console.log('拖拽结束',evt);
				let { oldIndex, newIndex } = evt;

				updateArticleSort({
					// 开始的
					initRanking: tableData.value[oldIndex].ranking,
					finalRanking: tableData.value[newIndex].ranking,
				}).then(
					(data) => {
						if (data.success === true) {
							ElMessage.success(data.message);

							// 数据获取了但是，页面没有改变，丢失了响应式,先将tabeData置空
							tableData.value = [];
							getData({ page: currentPage4.value, size: pageSize4.value });
						} else {
							ElMessage.error(data.message);
						}
					},
					(err) => {
						ElMessage.error(i18n.global.t('msg.excel.failed'));
					}
				);
			},
		});
	}
};
