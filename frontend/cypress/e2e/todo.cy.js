/// <reference types="cypress" />

describe('employer manager app', () => {
	let renderedEmail = `${new Date().getTime()}@test.com`;
	beforeEach(() => {
		cy.visit('http://localhost:3000/employee/list');
	});

	it('displays action button by default', () => {
		cy.get('button').contains('ADD EMPLOYEE').should('have.length', 1);
		cy.get('div[data-testid=change-view-type]').should('have.length', 1);
	});

	it('can add new employee', () => {
		cy.wait(2000);
		cy.get('button').contains('ADD EMPLOYEE').click({ force: true });

		// input new field
		cy.get('input[name=firstName]').type('Firstname');
		cy.get('input[name=lastName]').type('Lastname');
		cy.get('input[name=email]').type(renderedEmail);
		cy.get('input[name=phone]').type('1234567890');

		cy.get('button').contains('ADD').click();

		cy.wait(1000);
		cy.get('p').contains(renderedEmail).should('have.length', 1);
	});

	it('can update employee', () => {
		cy.wait(1000);
		const newRenderedEmail = `${new Date().getTime()}@test.com`;
		cy.get('p')
			.contains(renderedEmail)
			.parents('div.employer-info')
			.find('.btn-employer-edit')
			.click();

		// input new field
		cy.get('input[name=email]').clear().type(newRenderedEmail);

		cy.get('button').contains('SAVE').click();

		cy.wait(1000);
		cy.get('p').contains(newRenderedEmail).should('have.length', 1);
		renderedEmail = newRenderedEmail;
	});

	it('can delete employee', () => {
		cy.wait(1000);
		cy.get('p')
			.contains(renderedEmail)
			.parents('div.employer-info')
			.find('.btn-employer-delete')
			.click();

		cy.get('button').contains('Yes').click();

		cy.wait(1000);
		cy.get('p').contains(renderedEmail).should('have.length', 0);
	});
});
