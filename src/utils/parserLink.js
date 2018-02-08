const rxRel = /rel="(.+)"/;

const parser = (link, rxPage, rxPerPage) =>
    link
        .split(",")
        .map(section => section.split(";"))
        .map(value => {
            const page = Number(rxPage.exec(value[0])[1]);
            const perPage = Number(rxPerPage.exec(value[0])[1]);
            const rel = rxRel.exec(value[1])[1];
            return [rel, page, perPage];
        })
        .reduce((acc, value) => {
            acc[value[0]] = { page: value[1], perPage: value[2] };
            return acc;
        }, {});

function parserLink(link, page, perPage){
    const rxPage = new RegExp(`[?|&]${page}=(\\d+)`);
    const rxPerPage = new RegExp(`[?|&]${perPage}=(\\d+)`);

    return parser(link, rxPage, rxPerPage);
};

export default parserLink;
