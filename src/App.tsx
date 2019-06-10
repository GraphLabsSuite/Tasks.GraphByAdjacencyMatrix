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
    IVertexView,
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
           /* <Matrix // строка для тестирования
                rows={3}
                columns={3}
                defaultValues={[[0,1,1], [1,0,1], [1,1,0]]}
                readonly
            /> */
          <Matrix
               rows = {matrix.length}
               columns = {matrix.length}
               defaultValues={matrix}
               readonly
           />

        );

    }

    public calculate() {
        const graph = store.getState().graph;
        const matrix = store.getState().matrix;
        // const matrix = [[0,1,1], [1,0,1], [1,1,0]]; // строка для тестирования
        let res = 0;
        let index: number;
        let jndex: number;
        for (index = 0; index < matrix.length; index++) {
            for (jndex = 0; jndex < matrix.length; jndex++) {
                if (index !== jndex && ((matrix[index][jndex] === 1 &&
                    !graph.edges.some((e: IEdgeView) =>
                        (e.vertexOne === graph.vertices[index].name
                            && e.vertexTwo === graph.vertices[jndex].name
                            || e.vertexOne === graph.vertices[jndex].name
                            && e.vertexTwo === graph.vertices[index].name)
                    ))
                    || (matrix[index][jndex] === 0
                    && graph.edges.some((e: IEdgeView) =>
                        (e.vertexOne === graph.vertices[index].name
                            && e.vertexTwo === graph.vertices[jndex].name
                            || e.vertexOne === graph.vertices[jndex].name
                            && e.vertexTwo === graph.vertices[index].name)
                    )))) {
                    res += 5;
                    // tslint:disable-next-line no-console
                    console.log("Штраф "+res);
                }
            }
        }
        return Promise.resolve({success: res === 0, fee: res});
    }

    protected getTaskToolbar() {
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить граф по матрице смежности,' +
                ' которая находится в правой части модуля. ' +
                'Для добавления/удаления вершины нажмите кнопку +/- черного цвета. ' +
                'Для добавления ребра: ' +
                '1. Щелкните на первую вершину, которая ему инцидентна ' +
                '2. Шелкните на кнопку с цифрой 1 ' +
                '3. Щелкните на вторую вершину, которая ему инцидентна ' +
                '4. Щелкните на кнопку с цифрой два ' +
                '5. Щелкните на кнопку + зеленого цвета ' +
                'После построения графа нажмите кнопку отправки для проверки задания ';
            ToolButtonList.prototype.toolButtons = {
                'https://img.icons8.com/material/72/plus.png': () => {   // добавление вершины
                    const name = (store.getState().graph.vertices.length).toString();
                    store.dispatch(graphActionCreators.addVertex(name));
                    this.forceUpdate();
                },
                'https://img.icons8.com/ios/72/1.png': () => { // выбор первой вершины
                    window.sessionStorage.setItem('vertex1', store.getState().app.action.id);
                },
                'https://img.icons8.com/ios/72/2.png': () => { // выбор второй вершины
                    window.sessionStorage.setItem('vertex2', store.getState().app.action.id);
                },
                'https://img.icons8.com/color/72/plus.png': () => { // добавление ребра
                    const vertexOneName = window.sessionStorage.getItem('vertex1');
                    const vertexTwoName = window.sessionStorage.getItem('vertex2');
                    if(vertexTwoName&&vertexOneName) {
                        store.dispatch(graphActionCreators.addEdge(vertexOneName, vertexTwoName));
                        this.forceUpdate();
                    }
                },
                'https://img.icons8.com/ios/72/minus-filled.png': () => { // удаление вершины
                    const name = (store.getState().graph.vertices.length-1).toString();
                    store.dispatch(graphActionCreators.removeVertex(name));
                    this.forceUpdate();
                }
            };
            ToolButtonList.prototype.beforeComplete = this.calculate;
            return ToolButtonList;
        };
        return Toolbar;
    }

}

export default App;

