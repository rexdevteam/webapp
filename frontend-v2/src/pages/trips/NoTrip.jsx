import React from 'react'
import { Helmet } from "react-helmet-async";

import NoData from '../../components/ui/NoData';
import LinkBtn from '../../components/ui/LinkBtn';

const NoTrip = () => {
    const linkBtn = <LinkBtn txt={"View Trips"} link="/trips" />;

    return (
		<>
			<div id="no-trip">
				<Helmet>
					<title>{`404 - Trip not Found or Deleted - Expense Voyage`}</title>
				</Helmet>

				<NoData title={"Trip not Found or Deleted"} headBtn={linkBtn} />
			</div>
		</>
	);
}

export default NoTrip
