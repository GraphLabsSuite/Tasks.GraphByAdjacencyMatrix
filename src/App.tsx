import {Matrix} from 'graphlabs.core.lib';
import * as React from 'react';
import './App.css';
import {
    Template,
    store,
    IEdgeView,
    GraphVisualizer,
} from "graphlabs.core.template";
import {FunctionComponent} from "react";
import {graphModel} from "graphlabs.core.template";
import {IEdge, IVertex, Edge, Vertex} from 'graphlabs.core.graphs';

class App extends Template {

    constructor(props: {}) {
        super(props);
        this.calculate = this.calculate.bind(this);
        this.getArea = this.getArea.bind(this);
    }

    public task(): FunctionComponent<{}> {
        const matrix = store.getState().matrix;
        return () => (
            /*<Matrix // строка для тестирования
                rows={3}
                columns={3}
                defaultValues={
                [[0,1,1],
                [1,0,1],
                [1,1,0]]
                }
                readonly
            /> */
            <Matrix
                rows={matrix.length}
                columns={matrix.length}
                defaultValues={matrix}
                readonly
            />

        );
    }

    public calculate() {
        const graph = graphModel
        const matrix = store.getState().matrix;
        // const matrix = [[0, 1, 1], [1, 0, 1], [1, 1, 0]]; // строка для тестирования
        let res = 0;
        let index: number;
        let jndex: number;
        for (index = 0; index < matrix.length; index++) {
            for (jndex = 0; jndex < matrix.length; jndex++) {
                if (index > jndex && ((matrix[index][jndex] === 1 &&
                    !graph.edges.some((e: IEdge) =>
                        (e.vertexOne.name === graph.vertices[index].name
                            && e.vertexTwo.name === graph.vertices[jndex].name
                            || e.vertexOne.name === graph.vertices[jndex].name
                            && e.vertexTwo.name === graph.vertices[index].name)
                    ))
                    || (matrix[index][jndex] === 0
                        && graph.edges.some((e: IEdge) =>
                            (e.vertexOne.name === graph.vertices[index].name
                                && e.vertexTwo.name === graph.vertices[jndex].name
                                || e.vertexOne.name === graph.vertices[jndex].name
                                && e.vertexTwo.name === graph.vertices[index].name)
                        )))
                    || index === jndex
                    && graph.edges.some((e: IEdge) =>
                        (e.vertexOne.name === graph.vertices[index].name
                            && e.vertexTwo.name === graph.vertices[jndex].name
                            || e.vertexOne.name === graph.vertices[jndex].name
                            && e.vertexTwo.name === graph.vertices[index].name
                        ))) {
                    res += 5;
                    // tslint:disable-next-line no-console
                    // console.log("Штраф " + res);
                }
            }
        }
        if (graph.vertices.length !== matrix.length) {
            for (let vertNum = 0; vertNum < Math.abs(graph.vertices.length - matrix.length); vertNum++) {
                res += 5;
            }
        }
        return Promise.resolve({success: res === 0, fee: res});
    }

    protected getArea(): React.SFC<{}> {
        return () => <GraphVisualizer
            graph = {graphModel}
            adapterType={'writable'}
        />;
    }

     /*protected getTaskToolbar() {
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить граф по матрице смежности,' +
                ' которая находится в правой части модуля. ' +
                'Для добавления/удаления вершины нажмите кнопку "Add vertex"/"Remove vertex" ' +
                'Для добавления ребра: ' +
                '1. Щелкните на первую вершину, которая ему инцидентна ' +
                '2. Шелкните на кнопку "Choose first vertex" ' +
                '3. Щелкните на вторую вершину, которая ему инцидентна ' +
                '4. Щелкните на кнопку "Choose second vertex" ' +
                '5. Щелкните на кнопку "Add edge" ' +
                'Для удаления ребра сначала нажмите на ребро, затем на кнопку "Remove edge" ' +
                'После построения графа нажмите кнопку отправки для проверки задания ';
            ToolButtonList.prototype.toolButtons = {
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='add_vertex.png')": () => {   // добавление вершины
                    // const name = (store.getState().graph.vertices.length).toString();
                    // store.dispatch(graphActionCreators.addVertex(name));
                    // this.forceUpdate();

                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='choose_first_vertex.png')": () => { // выбор первой вершины
                    window.sessionStorage.setItem('vertex1', store.getState().app.action.id);

                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='choose_second_vertex.png')": () => { // выбор второй вершины
                    window.sessionStorage.setItem('vertex2', store.getState().app.action.id);
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='add_edge.png')": () => { // добавление ребра
                    const vertexOneName = window.sessionStorage.getItem('vertex1');
                    const vertexTwoName = window.sessionStorage.getItem('vertex2');
                    if (vertexTwoName && vertexOneName) {
                        store.dispatch(graphActionCreators.addEdge(vertexOneName, vertexTwoName));
                        this.forceUpdate();
                    }
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='remove_vertex.png')": () => { // удаление вершины
                    const name = (store.getState().graph.vertices.length - 1).toString();
                    store.dispatch(graphActionCreators.removeVertex(name));
                    this.forceUpdate();
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='remove_edge.png')": () => { // удаление вершины
                    const vertexOneName = store.getState().app.action.out;
                    const vertexTwoName = store.getState().app.action.in;
                    if (vertexTwoName && vertexOneName) {
                        store.dispatch(graphActionCreators.removeEdge(vertexOneName, vertexTwoName));
                        this.forceUpdate();
                    }
                }
            };
            ToolButtonList.prototype.beforeComplete = this.calculate;
            return ToolButtonList;
        };
        return Toolbar;
    }*/

}

export default App;

