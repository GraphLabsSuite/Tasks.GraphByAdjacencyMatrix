import {graphModel, store} from "graphlabs.core.template";
import {IGraph, IVertex, IEdge} from "graphlabs.core.graphs";

export class Test {
    public calculate(graph: IGraph<IVertex, IEdge>, matrix: number[][]) {
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
        return res;
    }

}

export default Test;
