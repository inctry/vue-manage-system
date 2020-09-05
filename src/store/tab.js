
export default {
    state: {
        menu: [],
        currentMenu: null,
        tabList: [    {
            path: '/',
            label: '首页',
            name: 'home',
            icon: 's-home',
        }]
    },
    mutations: {
        selectMenu(state, val) {
            if(val.name === 'home') {
                state.currentMenu = null;
            } else {
                state.currentMenu = val;
                var res = state.tabList.find((item) => item.name === val.name);
                if(res === undefined) state.tabList.push(val);
            }
        },
        closeTab(state, val) {
            var res = state.tabList.findIndex((item) => item.name === val.name);
            state.tabList.splice(res, 1);
        }
    }
}