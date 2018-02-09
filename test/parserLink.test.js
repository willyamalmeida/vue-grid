import parserLink from "./../src/utils/parserLink";

const mockLink = '<http://localhost:3000/rows?_page=1&_limit=10>; rel="first", <http://localhost:3000/rows?_page=2&_limit=10>; rel="next", <http://localhost:3000/rows?_page=10&_limit=10>; rel="last"';

describe("parserLink.js", () => {

    it("mock link parsed from parser function", () => {
        let result = parserLink(mockLink, "_page", "_limit");
        let expected = {
            first: { page: 1, perPage: 10 },
            next: { page: 2, perPage: 10 },
            last: { page: 10, perPage: 10 }
        };

        expect(result).toEqual(expected);
    });
});

