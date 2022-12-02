/**
 * @file Testing dislike feature
 */
import axios from 'axios';
import React from "react";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuit from "../components/tuits/tuit";

jest.mock("axios");

const MOCK_TUIT = {
    _id: "123456789",
    tuit: "test",
    postedBy: {
        _id: "000000000000000000000001",
        username: "jose",
        password: "password",
        email: "jose@jose.com"
    },
    stats: {
        replies: 0,
        retuits: 0,
        likes: 0,
        dislikes: 1
    }
}

describe('test to see if dislike is present with mock tuit', () => {
    render(
        <HashRouter>
            <Tuit tuit={MOCK_TUIT}/>
        </HashRouter>
    )

    test('tuit with dislike', () => {

        // Expecting 1 dislike from mock tuit to be in document
        const testTuit = screen.getByText(MOCK_TUIT.stats.dislikes)
        expect(testTuit).toBeInTheDocument()

    })
})
