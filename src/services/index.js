import axios from "axios";

import { URL_DOMAIN_V1 } from "./API";

const AjaxHelper = {};

AjaxHelper.get = (url, params, options) => {
    return axios.get(url, { params: params, ...options });
};

AjaxHelper.post = (url, params, options) => {
    return axios.post(url, params, options);
};

AjaxHelper.put = (url, params, options) => {
    return axios.put(url, params, options);
};

AjaxHelper.delete = (url, options) => {
    return axios.delete(url, options);
};

AjaxHelper.getList = async (url, params, options) => {
    //coupon
    if (url === "coupons") {
        var query = {
            PageIndex: params.pagination.page,
            PageSize: params.pagination.perPage,
            sortBy: params.sort?.field === "percent" ? "percent" : "percent",
            isDesc: params.sort?.order === "DESC",
            eventCode: params.filter?.eventCode,
        };
        var parsedQuery = parseQueryToUrl(query);

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;
        var queriedUrl = `${configedUrl}?${parsedQuery}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(queriedUrl, configedOptions);

        var data = result?.data?.data?.items;
        var total = result?.data?.data?.allTotalCount;

        return { total, data };
    }
    //--------------------------------

    //users
    if (url === "users") {
        var query = {
            PageIndex: params.pagination.page,
            PageSize: params.pagination.perPage,
            SortBy: params.sort?.field,
            IsDesc: params.sort.order === "DESC",
        };
        if (params.filter?.email) {
            query.Search = params.filter?.email;
            query.SearchBy = "email";
        }

        var parsedQuery = parseQueryToUrl(query);

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;
        var queriedUrl = `${configedUrl}?${parsedQuery}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(queriedUrl, configedOptions);

        var data = result?.data?.data?.items;
        var total = result?.data?.data?.allTotalCount;

        return { total, data };
    }
    //--------------------------------

    //users
    if (url === "orders") {
        var query = {
            PageIndex: params.pagination.page,
            PageSize: params.pagination.perPage,
            sortBy: params.sort?.field,
            isDesc: params.sort.order === "DESC",
        };
        if (params?.filter?.status) {
            query.status = params.filter?.status;
        }
        if (params?.filter?.userEmail) {
            query.userEmail = params.filter?.userEmail;
        }

        var parsedQuery = parseQueryToUrl(query);

        var configedUrl = `${URL_DOMAIN_V1}/${url}/managed`;
        var queriedUrl = `${configedUrl}?${parsedQuery}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(queriedUrl, configedOptions);

        var data = result?.data?.data?.items;
        var total = result?.data?.data?.allTotalCount;

        return { total, data };
    }
    //--------------------------------

    //coupon
    if (url === "products") {
        var query = {
            PageIndex: params.pagination.page,
            PageSize: params.pagination.perPage,
            Search: params.filter?.q,
            SortBy: params.sort?.field,
            IsDesc: params.sort?.order === "DESC",
        };

        var parsedQuery = parseQueryToUrl(query);

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;
        var queriedUrl = `${configedUrl}?${parsedQuery}`;

        var result = await axios.get(queriedUrl, configedOptions);

        var data = result?.data?.data?.items.map((item) => ({
            id: item.sku,
            ...item,
        }));
        var total = result?.data?.data?.allTotalCount;

        return { total, data };
    }
    //--------------------------------
    // var configedUrl
    // console.log(configedUrl, configedOptions);
    // var result = await axios.get(configedUrl, configedOptions);

    // result = configResult(url, result, "get list");

    // return result;
    // return {
    //     data: [
    //         {
    //             id: "test03",
    //             description: "A sweet valentine gift for girlfriend",
    //             detail: { color: "red", material: "wood" },
    //             imageUrl: "http://loremflickr.com/640/480/city",
    //             isActive: true,
    //             name: "gift demo 03",
    //             price: 50.25,
    //             sku: "test03",
    //             stock: 54,
    //             traits: ["gift", "demo", "valentine", "girl"],
    //         },
    //     ],
    //     total: 1,
    // };
};
AjaxHelper.getOne = async (url, payload) => {
    //coupons
    if (url === "coupons") {
        console.log(payload);

        var configedUrl = `${URL_DOMAIN_V1}/${url}/info`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(configedUrl, configedOptions);

        var data = result?.data?.data?.items;
        var total = result?.data?.data?.allTotalCount;

        return { total, data };
    }
    //---------------------------------------------

    //users
    if (url === "users") {
        var id = payload.id;

        var configedUrl = `${URL_DOMAIN_V1}/${url}/id/${id}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(configedUrl, configedOptions);
        var data = result?.data?.data;

        return { data };
    }
    //---------------------------------------------

    //users
    if (url === "orders") {
        var id = payload.id;

        var configedUrl = `${URL_DOMAIN_V1}/${url}/${id}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.get(configedUrl, configedOptions);
        var data = result?.data?.data;

        return { data };
    }
    //---------------------------------------------

    //users
    if (url === "products") {
        var id = payload.id;

        var configedUrl = `${URL_DOMAIN_V1}/${url}/sku/${id}`;

        var result = await axios.get(configedUrl);
        var data = result?.data?.data;

        data.id = id;

        return { data };
    }
    //---------------------------------------------

    // var configedUrl = `${configUrl(url)}/sku/${params.id}`;
    // if (url === "orders") configedUrl = `${configUrl(url)}/${params.id}`;

    // const configedOptions = configOptions(url);

    // var result = await axios.get(configedUrl, configedOptions);

    // result = configResult(url, result, "get one");
    // console.log(result);

    // return result;
    // return {
    //     data: {
    //         id: "test03",
    //         description: "A sweet valentine gift for girlfriend",
    //         detail: { color: "red", material: "wood" },
    //         imageUrl: "http://loremflickr.com/640/480/city",
    //         isActive: true,
    //         name: "gift demo 03",
    //         price: 50.25,
    //         sku: "test03",
    //         stock: 54,
    //         traits: ["gift", "demo", "valentine", "girl"],
    //     },
    // };
};
AjaxHelper.update = async function (url, payload) {
    // var { id, ...restData } = payload?.data;

    // const configedUrl = `${configUrl(url)}/${restData?.sku}`;

    // await axios.put(configedUrl, restData);

    // const result = await AjaxHelper.getOne(url, payload?.data);

    // return { data: payload?.data };
    // //return result
    //orders
    if (url === "orders") {
        var id = payload.id;
        var newStatus = payload.data.status;
        var preStatus = payload.previousData.status;
        var data = payload.data;

        if (newStatus === preStatus) {
            return { data };
        } else {
            var configedUrl = `${URL_DOMAIN_V1}/${url}/${id}/status/${newStatus}`;
            console.log(configedUrl);

            var token = localStorage.getItem("auth");
            var configedOptions = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            };

            var result = await axios.put(configedUrl, {}, configedOptions);
            console.log(result);

            return { data };
        }
        return { id: "123" };
    }
    //--------------------------------------------------------

    //prodccts
    if (url === "products") {
        var { id, ...data } = payload;
        console.log(payload);

        var configedUrl = `${URL_DOMAIN_V1}/${url}/${id}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.put(configedUrl, data, configedOptions);

        data.id = id;
        console.log(result);

        return { data };
    }
    //--------------------------------------------------------
};

AjaxHelper.create = async function (url, payload) {
    //coupon
    if (url === "coupons") {
        const configedUrl = `${URL_DOMAIN_V1}/${url}`;

        var params = payload.data;

        params.validFrom = new Date(params.validFrom);
        params.validTo = new Date(params.validTo);

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };

        var result = await axios.post(configedUrl, params, configedOptions);

        return { data: { id: "something", ...payload.data } };
    }
    //--------------------------------
    const configedUrl = `${configUrl(url)}`;

    var result = await axios.post(configedUrl, payload?.data);

    console.log(result);

    return { data: { id: payload?.sku, ...payload?.data } };
    return {
        data: {
            id: "test03",
            description: "A sweet valentine gift for girlfriend",
            detail: { color: "red", material: "wood" },
            imageUrl: "http://loremflickr.com/640/480/city",
            isActive: true,
            name: "gift demo 03",
            price: 50.25,
            sku: "test03",
            stock: 54,
            traits: ["gift", "demo", "valentine", "girl"],
        },
    };
};

AjaxHelper.deleteMany = async (url, params) => {
    //coupon
    if (url === "coupons") {
        var ids = params?.ids;

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            data: ids,
        };

        var result = await axios.delete(configedUrl, configedOptions);

        var data = ids;

        return { data };
    }
    //--------------------------------

    //users
    // if (url === "users") {
    //     var ids = params?.ids
    //     console.log(params)
    //     var configedUrl = `${URL_DOMAIN_V1}/${url}`;

    //     var token = localStorage.getItem("auth");
    //     var configedOptions = {
    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(token)}`,
    //         },
    //         data: ids,
    //     };

    //     //var result = await axios.delete(configedUrl, configedOptions);
    //     // console.log(result)
    //     var data = ids;

    //     return { data };
    // }
    //--------------------------------

    // var configedUrl
    // console.log(configedUrl, configedOptions);
    // var result = await axios.get(configedUrl, configedOptions);

    // result = configResult(url, result, "get list");

    // return result;
    // return {
    //     data: [
    //         {
    //             id: "test03",
    //             description: "A sweet valentine gift for girlfriend",
    //             detail: { color: "red", material: "wood" },
    //             imageUrl: "http://loremflickr.com/640/480/city",
    //             isActive: true,
    //             name: "gift demo 03",
    //             price: 50.25,
    //             sku: "test03",
    //             stock: 54,
    //             traits: ["gift", "demo", "valentine", "girl"],
    //         },
    //     ],
    //     total: 1,
    // };
};

AjaxHelper.delete = async (url, params) => {
    //coupon
    if (url === "coupons") {
        var ids = params?.ids;

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            data: ids,
        };

        var result = await axios.delete(configedUrl, configedOptions);

        var data = ids;

        return { data };
    }
    //--------------------------------

    //users
    if (url === "users") {
        var id = params?.id;

        var configedUrl = `${URL_DOMAIN_V1}/${url}`;

        var token = localStorage.getItem("auth");
        var configedOptions = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            data: { id },
        };

        var result = await axios.delete(configedUrl, configedOptions);

        return { data: { id } };
    }
    //--------------------------------
};

export default AjaxHelper;

//----------------------------------------------------------------
const configUrl = (url) => {
    switch (url) {
        case "products":
            return `${URL_DOMAIN_V1}/${url}`;
        case "users":
            return `${URL_DOMAIN_V1}/${url}`;
        case "orders":
            return `${URL_DOMAIN_V1}/${url}`;
        case "coupons":
            return `${URL_DOMAIN_V1}/${url}`;
        default:
            return url;
    }
};

//----------------------------------------------------------------
const configResult = (url, result, action) => {
    switch (url) {
        case "products": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items?.map((item, idx) => ({
                        id: item.sku,
                        ...item,
                    }));
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;
                    data.id = data?.sku;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        case "users": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items;
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        case "orders": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items;
                    console.log(data);
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        case "coupons": {
            switch (action) {
                case "get list":
                    return {
                        total: 1,
                        data: [
                            {
                                id: 1,
                                name: "Event",
                                percent: 5,
                                startAt: new Date("12/31/2022").toJSON(),
                                endAt: new Date("12/31/2022").toJSON(),
                                amount: 10,
                                isActive: true,
                                list: [
                                    // {
                                    //     id: 1,
                                    //     code: "abcdsgadha",
                                    //     isUsed: true,
                                    // },
                                    // {
                                    //     id: 2,
                                    //     code: "hsdsfhasdf",
                                    //     isUsed: true,
                                    // },
                                    // {
                                    //     id: 3,
                                    //     code: "eqreryusdf",
                                    //     isUsed: false,
                                    // },
                                    // {
                                    //     id: 4,
                                    //     code: "xbadsfetes",
                                    //     isUsed: true,
                                    // },
                                ],
                            },
                        ],
                    };
                case "get one": {
                    return {
                        data: {
                            id: 1,
                            name: "Event",
                            percent: 5,
                            startAt: new Date("12/31/2022").toJSON(),
                            endAt: new Date("12/31/2022").toJSON(),
                            amount: 10,
                            isActive: true,
                            list: [
                                // {
                                //     id: 1,
                                //     code: "abcdsgadha",
                                //     isUsed: true,
                                // },
                                // {
                                //     id: 2,
                                //     code: "hsdsfhasdf",
                                //     isUsed: true,
                                // },
                                // {
                                //     id: 3,
                                //     code: "eqreryusdf",
                                //     isUsed: false,
                                // },
                                // {
                                //     id: 4,
                                //     code: "xbadsfetes",
                                //     isUsed: true,
                                // },
                            ],
                        },
                    };
                }
            }
        }
        default:
            return result;
    }
};

const configOptions = (url) => {
    switch (url) {
        case "products": {
            return {};
        }
        case "users": {
            return {};
        }
        case "orders":
            {
                const token = localStorage.getItem("auth");
                return {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };
            }
            defautl: return {};
    }
};

const parseQueryToUrl = (object) => {
    const keys = Object.keys(object).filter((key) => object[key] !== undefined);
    const query = keys.map((key) => `${key}=${object[key]}`);
    return query.join("&");
};
