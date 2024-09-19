import React from "react";
import { Helmet } from "react-helmet-async";

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Expense = () => {

	return (
		<div id="expenses">
			<Helmet>
				<title>Expenses - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Expenses"} />
		</div>
	);
}

export default Expense;
