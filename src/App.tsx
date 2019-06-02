import {Matrix} from 'graphlabs.core.lib';
import * as React from 'react';
import './App.css';
import {
    graphActionCreators,
    Template,
    store,
    Toolbar,
    ToolButtonList,
    IEdgeView,
} from "graphlabs.core.template";
import {FunctionComponent} from "react";

class App extends Template {

    constructor(props: {}) {
        super(props);
        this.calculate = this.calculate.bind(this);
    }

    public task(): FunctionComponent<{}> {
        const matrix = store.getState().matrix;
        return () => (
            <Matrix
                rows={4}
                columns={4}
                defaultValues={[[1, 1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1]]}
                readonly
            />
          /* <Matrix
               rows = {matrix.length}
               columns = {matrix.length}
               defaultValues={matrix}
               readonly
           /> */

        );

    }

    public calculate() {
        const graph = store.getState().graph;
        const matrix = store.getState().matrix;
        let res = 0;
        let index: number;
        let jndex: number;
        for (index = 0; index < matrix.length; index++) {
            for (jndex = 0; jndex < matrix.length; jndex++) {
                if (index !== jndex && (matrix[index][jndex] === 1 &&
                    !graph.edges.some((e: IEdgeView) =>
                        (e.vertexOne === graph.vertices[index].name
                            && e.vertexTwo === graph.vertices[jndex].name
                            || e.vertexOne === graph.vertices[jndex].name
                            && e.vertexTwo === graph.vertices[index].name)
                    )
                    || matrix[index][jndex] === 0
                    && graph.edges.some((e: IEdgeView) =>
                        (e.vertexOne === graph.vertices[index].name
                            && e.vertexTwo === graph.vertices[jndex].name
                            || e.vertexOne === graph.vertices[jndex].name
                            && e.vertexTwo === graph.vertices[index].name)
                    ))) {
                    res++;
                }
            }
        }
        return {success: res === 0, fee: res};
    }

    protected getTaskToolbar() {
        // const graph = store.getState().graph;
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить граф по матрице смежности,' +
                ' которая находится в правой части модуля. ' +
                'После построения графа нажмите кнопку отправки для проверки задания';
            ToolButtonList.prototype.toolButtons = {
                'https://img.icons8.com/color/72/plus.png': () => {   // добавление вершины
                    const name = (store.getState().graph.vertices.length).toString();
                    store.dispatch(graphActionCreators.addVertex(name));
                    this.forceUpdate(); // как перерисовать только граф
                },
                'https://img.icons8.com/material/72/plus.png': () => { // добавление ребра
                    // store.dispatch(graphActionCreators.addEdge(vertexOne.name, vertexTwo.name));
                },
                'https://img.icons8.com/ios/72/minus-filled.png': () => { // удаление вершины
                    const name = (store.getState().graph.vertices.length-1).toString();
                    store.dispatch(graphActionCreators.removeVertex(name));
                    this.forceUpdate();
                }
            };
            return ToolButtonList;
        };
        return Toolbar;
    }

}

export default App;

