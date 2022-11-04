import Tuits from "../components/tuits";
import Tuit from   "../components/tuits/tuit";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy:{username: 'alice'}, _id: '123'},
    {tuit: "bob's tuit", postedBy:{username: 'bob'}, _id: '456'},
    {tuit: "charlie's tuit", postedBy:{username: 'charlie'}, _id: '789'}
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
      <HashRouter>
        <Tuit tuit={MOCKED_TUITS[0]} deleteTuit={function (){}}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
    const tuits = await findAllTuits();
    // console.log(tuits);
    render(
        <HashRouter>
            <Tuit tuit={tuits[0]} deleteTuit={function (){}}/>
        </HashRouter>);
    const linkElement = screen.getByText(/My name is Alice, and I am in Wonderland!/i);
    expect(linkElement).toBeInTheDocument();
})


/**
 * @jest-environment jsdom
 */
describe('tuit list renders mocked', () => {

    const axios = require('axios')

    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })


test('tuit list renders mocked', async () => {
  // TODO: implement this
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.users;

    render(
        <HashRouter>
            <Tuit tuit={tuits[0]} deleteTuit={function (){} }/>
            <Tuit tuit={tuits[1]} deleteTuit={function (){} }/>
            <Tuit tuit={tuits[2]} deleteTuit={function (){} }/>
        </HashRouter>);

    const tuit0 = screen.getByText(/alice's tuit/i);
    expect(tuit0).toBeInTheDocument();

    const tuit1 = screen.getByText(/bob's tuit/i);
    expect(tuit1).toBeInTheDocument();

    const tuit2 = screen.getByText(/charlie's tuit/i);
    expect(tuit2).toBeInTheDocument();

    });

});
