// import { fileURLToPath, URL } from 'url'
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// npm install vue3-print-nb --save  --legacy-peer-deps
//npm uninstall vue-router --legacy-peer-deps

//npm install vue-router@next -S --legacy-peer-deps
// "@toast-ui/editor": "^3.2.0",
// "@toast-ui/vue-editor": "^3.2.0",

// 1.自动引入element图标
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';

// 2.自动引入elementplus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import eslintPlugin from 'vite-plugin-eslint';

// 3.兼容处理
// import legacy from '@vitejs/plugin-legacy'

// 4.引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
	resolve: {
		alias: {
			'@': pathSrc,
		},
		extensions: ['.js', '.mjs'],
	},
	base: '/',
	plugins: [
		// eslintPlugin({
		//   include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		// }),
		Vue(),
		vueJsx(),
		// 兼容性设置
		// legacy({
		//   targets: ['defaults', 'not IE 11']
		// }),
		AutoImport({
			// Auto import functions from Vue, e.g. ref, reactive, toRef...
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue'],

			// Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),

				// Auto import icon components
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],

			dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
		}),

		Components({
			resolvers: [
				// Auto register icon components
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep'],
				}),
				// Auto register Element Plus components
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
			],

			dts: path.resolve(pathSrc, 'components.d.ts'),
		}),

		Icons({
			autoInstall: true,
		}),
		Inspect(),

		//svg文件
		createSvgIconsPlugin({
			// 指定要缓存的文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
			// 指定symbolId格式
			symbolId: '[name]',
		}),
	],
	// 设置本地服务器和代理
	server: {
		port: 3001,
		open: '/login', // 自动打开的网站端口

		proxy: {
			// 正则表达式写法
			'^/prod-api/': {
				target: 'https://imooc-admin.lgdsunday.club/',
				// target:"http://localhost:3000/",
				// target:loadEnv('development', './').PROXY_URL,
				changeOrigin: true, //允许跨域
				// rewrite: (path) => path.replace(/^\/sys/, ''),
				// 当是sys/login 相对与 /login
			},
			// 获得表单数据
			'^/api/': {
				target: 'http://localhost:3010/',
				// target:"http://localhost:3000/",
				// target:loadEnv('development', './').PROXY_URL,
				changeOrigin: true, //允许跨域
				// rewrite: (path) => path.replace(/^\/sys/, ''),
				// 当是sys/login 相对与 /login
			},

			//文件上传
			'^/fileChunk': {
				// target: 'https://imooc-admin.lgdsunday.club/prod-api',
				target: 'http://localhost:3010/',
				// target:loadEnv('development', './').PROXY_URL,
				changeOrigin: true, //允许跨域
				// rewrite: (path) => path.replace(/^\/data/, ''),
				// 当是sys/login 相对与 /login
			},
			'^/newsqa': {
				target: 'https://api.inews.qq.com/',
				changeOrigin: true, //允许跨域
			},
		},
	},
});
