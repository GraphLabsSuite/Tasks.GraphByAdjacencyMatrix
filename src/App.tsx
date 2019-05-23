import {Matrix} from 'graphlabs.core.lib';
import {Graph, Vertex, Edge, IGraph, IVertex, IEdge} from 'graphlabs.core.graphs';
import * as React from 'react';
import './App.css';
import {
    graphActionCreators,
    Template,
    store,
    Toolbar,
    ToolButtonList,
    IEdgeView,
} from 'graphlabs.core.template';
import {FunctionComponent} from 'react';

class App extends Template {

    constructor(props: {}) {
        super(props);
        this.calculate = this.calculate.bind(this);
    }

    public task(): FunctionComponent<{}> {
        const matrix = store.getState().matrix;
        return () => (
            <Matrix
                rows={5}
                columns={5}
                defaultValues={[[0, 1, 0, 0, 0], [1, 1, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 0, 1]]}
                readonly
            />
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
                if (index !== jndex && (matrix[index][jndex] === 1
                    && !graph.edges.some((e: IEdgeView) =>
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
        const graph = new Graph<Vertex, Edge>();
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить граф по матрице смежности, ' +
                'которая находится в правой части модуля. ' +
                'После построения графа нажмите кнопку отправки для проверки задания';
            ToolButtonList.prototype.toolButtons = {
                'https://pngicon.ru/file/uploads/plus.png': () => {   // добавление вершины
                    const name = (graph.vertices.length + 1).toString();
                    graph.addVertex(new Vertex(name)); // ??
                    const v = graph.vertices[name]; // ??
                    store.dispatch(graphActionCreators.addVertex(v.name));
                    graph.getVertex(name);
                },
            };
            return ToolButtonList;
        };
        return Toolbar;
    }

}

export default App;

