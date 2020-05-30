import {IEdge, IVertex, IGraph, Vertex, Edge, Graph} from "graphlabs.core.graphs";
import * as chai from 'chai';
import {Test} from "./src/Test";

describe('calculate', () => {
    const test = new Test();
    const testModel1 = [[0, 1, 1], [1, 0, 1], [1, 1, 0]];
    const testModel2 = [[0, 1, 0], [1, 0, 1], [1, 1, 0]]
    describe('lack of edges', () => {
        const testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        it('test case 1', () => {
            chai.assert(test.calculate(testGraph1, testModel1) === 5);
        })
    })
    describe('extra edges', () => {
        const testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('3')));
        it('test case 1', () => {
            chai.assert(test.calculate(testGraph1, testModel2) === 5);
        })
    })
    describe('lack of vertices', () => {
        const testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        it('test case 1', () => {
            chai.assert(test.calculate(testGraph1, testModel1) === 5);
        })
    })
    describe('extra vertices', () => {
        const testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addVertex(new Vertex('4'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('3')));
        it('test case 1', () => {
            chai.assert(test.calculate(testGraph1, testModel1) === 5);
        })
    })
})
