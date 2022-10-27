import { compileString } from 'sass';
import { ref } from 'vue';

import { useRoute } from 'vue-router';
import { updateArticle, Article } from '../../utilities/Request';
export function useIndex() {
	let Route = useRoute();

	console.log('Route', Route.params.id);

	if (Route.params?.id) {
		//   Article(Route.params.id).then(data=>{
		//     if(data.success===true)
		//     {
		//             title.value=data.data.title;
		//             content.value=data.data.content;
		//     }
		//     else
		//     {
		//     }
		//   },err=>{
		//   })
	}

	const title = ref('');
	const id = ref('');
	const content = ref('');
	const activeName = ref('first');

	const handleClick = (tab, event) => {
		console.log(tab, event);
	};

	const clearTitle = () => {
		title.value = '';
	};
	return { title, id, content, activeName, handleClick, clearTitle };
}
