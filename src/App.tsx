import {Matrix, IMatrix} from 'graphlabs.core.lib';
import {IGraph, IVertex, IEdge, Graph, Vertex, Edge} from 'graphlabs.core.graphs';
import * as React from 'react';
import './App.css';
import {
    graphActionCreators,
    Template,
    store,
    Toolbar,
    ToolButtonList,
    IEdgeView,
    IVertexView
} from "graphlabs.core.template";


class App extends Template {


    protected task(): React.SFC<{}> {
        const matrix = store.getState().matrix;
        return () => (
            <Matrix
                rows={matrix.length}
                columns={matrix.length}
                defaultValues={matrix}
                readonly
            />
        );
    }

    protected getTaskToolbar() {
        const graph = new Graph<Vertex, Edge>();
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.toolButtons = {
                'Add edge': () => { // добавление ребрf
                },
                'Add vertex': () => {   // добавление вершины
                    const name = (graph.vertices.length + 1).toString();
                    graph.addVertex(new Vertex(name));
                    const v = graph.vertices[name];
                    store.dispatch(graphActionCreators.addVertex(v.name));
                    graph.getVertex(name);
                }
            };
            return ToolButtonList;
        };
        return Toolbar;
    }

}

export default App;

