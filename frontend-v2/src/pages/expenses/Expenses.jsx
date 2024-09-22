import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CircularProgress, Typography } from "@mui/material";

import { useAlert } from "../../context/AlertContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { sendApiRequest, setAuthToken } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from "../../components/ui/LoadingPage.jsx";
import NoData from "../../components/ui/NoData.jsx";
import LinkBtn from "../../components/ui/LinkBtn";
import Table from "../../components/ui/Table.jsx";

const Expense = () => {
	const { access_token } = useAuth();
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setAlert } = useAlert();


	useEffect(() => {
		setAuthToken(access_token);

		const getExpenses = async () => {
			try {
				const data = await sendApiRequest("/expenses", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);

				setExpenses(data.data.expenses);
			} catch (err) {
				setAlert(err?.message || "Couldn't fetch expenses", "error");
				console.error("Error fetching Expenses", err);
			} finally {
				setLoading(false);
			}
		};

		getExpenses();
	}, []);

	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "name", headerName: "Name" },
		{ field: "amount", headerName: "Amount" },
		{ field: "trip", headerName: "Trip" },
	];

	if (loading) return <LoadingPage />;

	const linkBtn = <LinkBtn txt={"Create Expense"} link="/expenses/new" />;

	return (
		<div id="expenses">
			<Helmet>
				<title>Expenses - Expense Voyage</title>
			</Helmet>

			{expenses.length > 0 ? (
				<>
					<PageHead title={"Expenses"} headBtn={linkBtn} />
					<Table columns={columns} data={expenses} />
				</>
			) : (
				<NoData title={"No expenses available"} headBtn={linkBtn} />
			)}
		</div>
	);
};

export default Expense;
