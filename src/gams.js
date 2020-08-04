import React from 'react';
import "./games.css"
class Games extends React.Component{
    render(){
        return(
           <div className="wrapper">
                {this.state.isGameOver && <button onClick={(e)=>{this.activateLasers(e)}}>再来一局！</button>}
                <ul>
                    {this.state.cards.map(item=>{
                        let divContent = ""
                        if (item.status === "against") {
                            divContent = <div className= "againstColor"></div>
                        }else if (item.status === "upright") {
                            let styles = {
                                backgroundColor: this.state.showColor[item.value]
                            }
                            divContent = <div style={styles}></div>
                        }else if (item.status === "empty") {
                            divContent = <div className= "empty"></div>
                        }
                        return(
                            <li key={item.id} onClick={()=>{this.pickCard(item)}}>
                              {divContent}
                            </li>
                        )
                    })}
                </ul>
           </div>
        )
    }

    constructor(props){
        super(props)
        this.state = {
            cards: [],
            originalCards:[
                {
					id: 1,
					value: "one",
					status: "against",
				},
				{
					id: 2,
					value: "one",
					status: "against",
				},
				{
					id: 3,
					value: "two",
					status: "against",
				},
				{
					id: 4,
					value: "two",
					status: "against",
				},
				{
					id: 5,
					value: "three",
					status: "against",
				},
				{
					id: 6,
					value: "three",
					status: "against",
				},
				{
					id: 7,
					value: "four",
					status: "against",
				},
				{
					id: 8,
					value: "four",
					status: "against",
				},
				{
					id: 9,
					value: "five",
					status: "against",
				},
				{
					id: 10,
					value: "five",
					status: "against",
				},
				{
					id: 11,
					value: "six",
					status: "against",
				},
				{
					id: 12,
					value: "six",
					status: "against",
				},
            ],
			showColor: {
				one: "#FF88C2",
				two: "#FFAA33",
				three: "#FFFF33",
				four: "#66FF66",
				five: "#33FFFF",
				six: "#9F88FF",
            },
            pickNum: [],//记录卡牌反转个数
            isGameOver: false
        }
    }

    componentDidMount(){
        this.stochastic()
    }

    //产生卡片随机状态
    stochastic(){
        //深拷贝数据，在全部卡牌抵消后，可再次开始游戏
        let cards = JSON.parse(JSON.stringify(this.state.originalCards))
        let condit = 0
        while (condit < 10) {
            condit++;
            //产生一个随机数,作为下标
            let ran = Math.floor(Math.random() * 11 + 0);
            let num = cards.splice(ran,1)
            cards.push(num[0])
            this.setState({
                cards: cards
            })
        }
    }

    pickCard(info){
        // console.log(info);
        var that = this;
        //（每次触发点击事件）判断当前是否为第二张翻转的卡牌,或者当前卡牌是否为已对消卡牌
        if (that.state.pickNum.length === 2 || info.status !== "against") {
            return
        }
        info.status = "upright"
        that.setState({
            cards:that.state.cards
        })
         //本次点击前，没有反转卡牌
        if (that.state.pickNum.length === 0) {
            //则记录本地点击的卡牌内容
            that.state.pickNum.push(info)
        }else{
            //添加第二张翻转的卡牌
            that.state.pickNum.push(info)
            //本次点击前已有翻转的卡牌，判断vulue值是否相等,相等两张卡牌就对消
            if (that.state.pickNum[0].value === that.state.pickNum[1].value) {
                setTimeout(() => {
                    //抵消两张相同卡牌
                    that.state.pickNum[0].status = "empty"
                    that.state.pickNum[1].status = "empty"
                    that.setState({
                        cards:that.state.cards
                    })
                    that.state.pickNum = [] //两张卡牌全部抵消后，清空pickNum记录的内容，方便下次点击记录
                    that.isOVer()
                }, 500);
            }else{//本次点击前已有翻转的卡牌，与已翻转卡牌value不等，两张卡牌翻回灰色
                setTimeout(() => {
                    that.state.pickNum[0].status = "against"
                    that.state.pickNum[1].status = "against"
                    that.setState({
                        cards:that.state.cards
                    })
                    that.state.pickNum = []
                }, 2000);
            }
        }
    }

    activateLasers(e) {
        this.setState({
            isGameOver: false
        })
        this.stochastic();
    }

    //判断所有卡牌是否都抵消了
    isOVer(){
        let flag = this.state.cards.every(item =>{
            return item.status === "empty"
        })
        this.setState({
            isGameOver: flag
        })
        
    }
}

export default Games;