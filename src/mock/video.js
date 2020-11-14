import { mock } from "mockjs";
import Mock from 'mockjs'
import moment from 'moment'

let List = []
let count = 200

function param2Obj(url) {
    let search = url.split('?')[1]
  
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
}
function datechange(date) {
    return moment(date).format("yyyy-MM-DD")
    // return ff.format("yyyy-mm-dd");
}

for(let i = 0; i < 200; i++) {
    List.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        date: Mock.Random.date(),
        income: Mock.Random.integer(0, 5000)
    }))
}
export default {
    getVideoList: (config) => {
        const {keyword, page = 1, limit = 20} = param2Obj(config.url)

        let mocklist = List.filter((video) => {
            if(video.name.indexOf(keyword) === -1) return false;
            return true;
        });

        let pagelist = mocklist.filter((item, index) => {
            return index >= (page - 1) * limit && index < page * limit;
        });
        return {
            code: 20000,
            count: mocklist.length,
            list: pagelist
        }
    },

    deleteVideo: (config) => {
        const { id } = param2Obj(config.url);

        if(!id) {
            return {
                code: -999,
                message: "参数不正确"
            }
        } else {
            List = List.filter((video) => video.id !== id);
            return {
                code: 20000,
                message: "删除成功"
            }
        }
    },

    createVideo: (config) => {
        let { name, date, income} = JSON.parse(config.body)
        // console.log(config.body);
        date = datechange(date)
        List.push(Mock.mock({
            id: Mock.Random.guid(),
            name: name,
            date: date,
            income: income,
        }))
        
        return {
            code: 20000,
            message: "添加成功"
        }
    },

    updateVideo: (config) => {
        let { id, name, date, income} = JSON.parse(config.body)
        date = datechange(date);
        List.some((item) => {
            if(item.id === id) {
                [item.name, item.date, item.income] = [name, date, income];
                return true;
            }
        })
        return {
            code: 20000,
            message: "修改成功"
        }

    }


}
