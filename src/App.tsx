import {Matrix} from 'graphlabs.core.lib';
import {Graph, Vertex, Edge} from 'graphlabs.core.graphs';
import * as React from 'react';
import './App.css';
import {
    graphActionCreators,
    Template,
    store,
    Toolbar,
    ToolButtonList,
} from "graphlabs.core.template";
import {FunctionComponent} from "react";


class App extends Template {
    public task(): FunctionComponent<{}> {
        const matrix = store.getState().matrix;
        return () => (
            <Matrix
                rows={5}
                columns={5}
                defaultValues={[[0,1,0,0,0],[1,1,1,0,0],[0,1,0,1,0],[1,0,1,1,0],[0,1,0,0,1]]}
                readonly
            />
        );
    }

    public getTaskToolbar() {
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

