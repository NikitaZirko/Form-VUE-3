import {toRefs, reactive, watch} from 'vue';

export default (url, config = {}) => {
	const state = reactive({
		res: {},
		data: null,
		err: null,
		loading: true,
	});

	const sendRequest = async () => {
		try {
			state.res = await fetch(url, config);
			state.data = state.res;
			//state.data = await state.res.json();
		} catch (error) {
			state.err = error;
			console.log(error);
		} finally {
			state.loading = false;
		}
	};

	sendRequest();

	return {...toRefs(state)};
};
