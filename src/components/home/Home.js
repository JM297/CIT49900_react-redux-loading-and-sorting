import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeSort} from "../../redux/actions/setActions";
import ToggleModal from "./ToggleModal";

export default function Home(){
    const [cards, setCards] = useState([]);
    const dispatch = useDispatch();
    const sort = useSelector(state => state.sort);
    const list = useSelector(state => state.list);
    const colorList = useSelector(state => state.colors);
    const typeList = useSelector(state => state.types);

    useEffect(()=>{
        let sortedList = list;
        for(let i in sort){
            if(sort[i].toggle){
                if(i==="value"){
                    sortedList=sortedList.filter((item)=>{
                        let ret = false;
                        let sortNum = Number(sort[i].val);
                        if(sortNum === 24){
                            if(item.value <= sortNum){
                                ret = true;
                            }
                        } else {
                            if(item.value >= sortNum){
                                ret = true;
                            }
                        }
                        return ret;
                    });
                } else if(i==="color" || i ==="type"){
                    sortedList=sortedList.filter((item)=>{
                        return sort[i].val.includes(item[i]);
                    });
                }
            }
        }
        setCards(sortedList);
    },[sort, list]);

    let renderCards = cards.map((c, idx) =>
            <ToggleModal
                key={idx}
                toggle={show => <div className="item" style={{color:c.color, cursor:"pointer"}}  onClick={show}><h1>{c.name}</h1></div>}
                content={hide => (
                    <div className="modal">
                        <div key={idx} className="card" style={{backgroundColor:c.color}}>
                            <h1>{c.name}</h1>
                            <h3>Type: {c.type}</h3>
                            <h3>Color: {c.color}</h3>
                            <h3>Cost: {c.value} Points</h3>
                            <button onClick={hide}>Close</button>
                        </div>
                    </div>
                )}
            />
    );
    let colorButtons = colorList.map((c,idx)=>
        <button key={idx} style={{color:`${c.name}`}} onClick={()=>dispatch(changeSort("color",`${c.name}`))}>{c.name}s</button>
    );
    let typeButtons = typeList.map((t,idx)=>
        <button key={idx} onClick={()=>dispatch(changeSort("type",`${t.name}`))}>{t.name}s</button>
    );

    return(
        <div className="home">
            <div className="buttons">
                {typeButtons}<br/><br/>
                {colorButtons}<br/><br/>
                <button onClick={()=>dispatch(changeSort("value",25))}>25+</button>
                <button onClick={()=>dispatch(changeSort("value",24))}>&lt;25</button>
            </div>
            <div className="list">
                {renderCards}
            </div>
        </div>
    )
}