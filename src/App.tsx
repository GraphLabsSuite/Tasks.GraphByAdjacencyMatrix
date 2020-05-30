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
import {graphModel, Toolbar, ToolButtonList} from "graphlabs.core.template";
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
        const graph = graphModel;
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
        const indexes: string[] = [];
        for (let s = 0; s < matrix.length; s++) {
            indexes.push(s.toString());
        }
        for (let k = 0; k < graph.vertices.length; k++) {
            if (!matrix.find((v: IVertex) => indexes.includes(graph.vertices[k].name))) {
                res += 5;
                const edges = graph.edges.filter((e: IEdge) => e.vertexTwo.name === graph.vertices[k].name || e.vertexOne.name === graph.vertices[k].name)
                for (let r = 0; r < edges.length; r++) {
                    res += 5;
                    console.log('sht');
                }
            }
        }
        return Promise.resolve({success: res === 0, fee: res});
    }

    protected getArea(): React.SFC<{}> {
        return () => <GraphVisualizer
            graph={graphModel}
            adapterType={'writable'}
            vertexNaming={true}
        />;
    }

    protected getTaskToolbar() {
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить граф по матрице';
            ToolButtonList.prototype.beforeComplete = this.calculate;
            return ToolButtonList;
        }
        return Toolbar;
    }

}

export default App;

