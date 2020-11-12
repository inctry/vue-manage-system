import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        menu: [],
        tabList: [    {
            path: '/',
            label: '首页',
            name: 'home',
            icon: 's-home',
        }]
    },
    mutations: {
        setMenu(state, value) {
            state.menu = value
            Cookie.set('menu',JSON.stringify(value))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        clearTabList(state) {
            state.tabList = [{
                path: '/',
                label: '首页',
                name: 'home',
                icon: 's-home',
            }];
        },
        addMenu(state, router) {
            if(!Cookie.get('menu')) return;
            let menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            let currentMenu = [
                {
                    path: '/',
                    component: () => import('@/views/Main'),
                    children: []
                }
            ]
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)

                }
            })
            router.addRoutes(currentMenu);
        },
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
        },
        collapse(state) {
            state.isCollapse = !state.isCollapse;
        }
    }
}


