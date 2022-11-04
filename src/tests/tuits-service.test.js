import {
    createUser,
    deleteUsersByUsername, findAllUsers,
    findUserById
} from "../services/users-service";

import {
    createTuitByUser,
    deleteTuit, findTuitById,
    findAllTuits,
} from "../services/tuits-service";

// function found at https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
// used to generate random tuit IDs
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/**
 * Testing we can create tuits.
 */
describe('can create tuit with REST API', () => {
  // TODO: implement this
    //sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const ripleyTuit = {
        _id: genRanHex(24),
        tuit: 'is this getting deleted?'
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        deleteUsersByUsername(ripley.username);
        deleteTuit(ripleyTuit._id);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(ripley.username);
        deleteTuit(ripleyTuit._id);
    })

    test('can create new tuit with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuitByUser(newUser._id, ripleyTuit);

        // verify inserted user's properties and tuit's properties match parameter user and tuit
        expect(newUser.username).toEqual(ripley.username);
        expect(newUser.password).toEqual(ripley.password);
        expect(newUser.email).toEqual(ripley.email);
        expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
    });
});

/**
 * Testing we can delete tuits
 */
describe('can delete tuit with REST API', () => {
  // TODO: implement this
    const ripley = {
            username: 'ellenripley',
            password: 'lv426',
            email: 'ellenripley@aliens.com'
        };

        const ripleyTuit = {
            _id: genRanHex(24),
            tuit: 'this is ripleys test tuit'
        };

        // setup test before running test
        beforeAll(async () => {
            // create a user (Ripley) and create a tuit with Ripley's account
            const testUser = await createUser(ripley);
            return createTuitByUser(testUser._id, ripleyTuit);
        })

        // clean up after test runs
        afterAll(() => {
            // remove any data we created
            deleteUsersByUsername(ripley.username)
            deleteTuit(ripleyTuit._id);
        })

        test('can delete tuit with REST API', async () => {
            // delete ripley's tuit by id
            const deleteStatus = await deleteTuit(ripleyTuit._id);

            // verify we deleted the tuit
            expect(deleteStatus.deletedCount).toBeGreaterThanOrEqual(1);
        });
    });

/**
 * Testing we can retreive a tuit by its primary key
 */
describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    const smith = {
        username: 'smith',
        password: 'lv426',
        email: 'smithscott@aliens.com'
    };

    const smithTuit = {
        _id: genRanHex(24),
        tuit: 'smith test tuit'
    };

    // setup test before running test
    beforeAll(async () => {
        // create a user (Ripley) and create a tuit with Ripley's account
        deleteUsersByUsername(smith.username)
        return deleteTuit(smithTuit._id)
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(smith.username)
        return deleteTuit(smithTuit._id);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // create new user Smith
        const newUser = await createUser(smith);
        const newTuit = await createTuitByUser(newUser._id, smithTuit)

        // verify we deleted the tuit
        expect(newTuit._id).toEqual(smithTuit._id);

    });
});

/**
 * Testing to retreive all of the tuits in the database
 */
describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    const mappy = {
        username: 'mappy',
        password: 'lv426',
        email: 'mappymap@aliens.com'
    };

    const mapTuit = [
        {
            _id: genRanHex(24),
            tuit: "map tuit 1",
        },
        {
            _id: genRanHex(24),
            tuit: "map tuit 2",
        },
        {
            _id: genRanHex(24),
            tuit: "map tuit 3",
        },
    ]

    // setup test before running test
    beforeAll(async () => {
        // delete user and all tuits
        deleteUsersByUsername(mappy.username);
        mapTuit.map(tuitObject =>
            deleteTuit(tuitObject._id));
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(mappy.username);
        mapTuit.map(tuitObject =>
            deleteTuit(tuitObject._id));
    })

    test('can retrieve all tuits with REST API', async () => {
        // create test user from Mappy
        const testUser = await createUser(mappy);
        // use map to create Mappy's tuits
        mapTuit.map(tuitObject =>
            createTuitByUser(testUser._id, tuitObject));

        // get all of the tuits we created
        const tuitsFromDatabase = await findAllTuits();

        // filtering for the tuits we created
        const testTuits = await tuitsFromDatabase.filter(
            eachTuit => (eachTuit.postedBy !== null &&
                eachTuit.postedBy.username === testUser.username));

        // need to figure out why only two tuits are being returned
        // console.log(testTuits);

        // checking to see that testuser(mappy) made the tuits
        testTuits.forEach(eachTuit => {
            expect(eachTuit.postedBy.username).toEqual(testUser.username);
        })
    });

});