import React from 'react'

const Footer = () => {
    return (
		<>
			<footer className="footer">
				<div class="container col-12">
					<div className="footer-columns">
						<div className="column">
							<h4>
								Expense<span>Voyage</span>
							</h4>

							<p>
								Expense Voyage is your personal travel expense
								manager. Track receipts, categorize expenses,
								and generate detailed reports effortlessly.
							</p>

							<p>
								Simplify your travel bookkeeping and stay
								organized on the go.
							</p>
						</div>

						<div className="column"></div>
					</div>

					<div className="footer-bottom flex flexCenter">
						<p> © 2024 All Right Reserved </p>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer