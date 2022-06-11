import AjaxHelper from "../../services";

import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser } from "react-admin";

import PersonIcon from "@mui/icons-material/Person";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import ProductList from "../products";
import { ProductEdit } from "../products/edit";
import { ProductCreate } from "../products/create";
import {ProductShow} from "../products/show";

import { UserList } from "../users";
import { UserShow } from "../users/show";

import { OrderList } from "../orders";
import { OrderShow } from "../orders/show";
import { OrderEdit } from "../orders/edit";

import { CouponList } from "../coupons";
import { CouponCreate } from "../coupons/create";

import authoProvider from "../../providers/auth";

//import jsonServerProvider from "ra-data-json-server

export default function Exam() {
    return (
        <>
            <Admin
                dataProvider={AjaxHelper}
                authProvider={authoProvider}
                requireAuth
            >
                <Resource
                    name="products"
                    show={ProductShow}
                    list={ProductList}
                    edit={ProductEdit}
                    create={ProductCreate}
                />
                <Resource
                    name="orders"
                    list={OrderList}
                    show={OrderShow}
                    edit={OrderEdit}
                    icon={FactCheckIcon}
                />
                <Resource
                    name="users"
                    list={UserList}
                    show={UserShow}
                    icon={PersonIcon}
                    // edit={ProductEdit}
                    // create={ProductCreate}
                />
                <Resource
                    name="coupons"
                    list={CouponList}
                    create={CouponCreate}
                    icon={ConfirmationNumberIcon}
                />
            </Admin>
        </>
    );
}
