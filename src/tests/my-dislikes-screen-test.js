/**
 * @file Testing my-dislike functionality
 */
import React from "react";
import Tuits from "../components/tuits";
import {HashRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
const axios = require('axios')

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

describe('setting up mock tuit', () => {
    beforeAll(() => {
        jest.spyOn(axios, "get").mockImplementation()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    test('test to see if mock tuit renders', async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: MOCK_TUIT})
        )

        render(
            <HashRouter>
                <Tuits tuits={MOCK_TUIT}/>
            </HashRouter>
        )

        MOCK_TUIT.map(
            tuit => {
                // Check to see if dislikes render on MyDislikes component
                let tuits = tuit.stats.dislikes.toString()
                const tuitText = screen.getAllByText(tuits)
                tuitText.forEach(
                    dislike => expect(dislike).toBeInTheDocument()
                )
            }
        )

    })
})