import { Chromeless } from 'chromeless'
import expect from 'expect'
require('dotenv').config({ silent: true })
const CHROMELESS_OPTIONS = { debug: true }


describe('Search Functionality', async function () {
	it('Can search on homepage and get to SRP', async function () {
		try {
			this.timeout(70000);
			const chromeless = new Chromeless(CHROMELESS_OPTIONS)
			const URL = await chromeless
				.goto(`${process.env.ORIGIN}/?locale=national`)
				.wait('input[id=home]')
				.type('New York, NY\r', 'input[id=home]')
				.wait('#srp-list')
				.evaluate(() => document.URL)

			await chromeless.end();
			await expect(URL).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
		} catch(err) {
			console.log(err)
			await err
		}
	})

	it('Can search from SRP and get to another SRP', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/atlanta-ga`)
			.wait('input[id=navBar]')
			.type('Chicago, IL\r', 'input[id=navBar]')
			.wait('#srp-list')
			.evaluate(() => document.URL)

		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/chicago-il`)
	})

	it('Can search from LDP and get to SRP', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/binder-ca?property_id=2593658897`)
			.wait('input[id=navBar]')
			.type('Brooklyn\r', 'input[id=navBar]')
			.wait('#srp-list')
			.evaluate(() => document.URL)

		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/brooklyn-ny`)

	})


	it('Can search from article and get to SRP', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/articles/essential-design-tips-every-renter-should-know`)
			.wait('input[id=navBar]')
			.type('West Loop\r', 'input[id=navBar]')
			.wait('#srp-list')
			.evaluate(() => document.URL)

		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/chicago-il/west-loop`)
	})

	it('Can search using search button', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[id=home]')
			.type('New York, NY', 'input[id=home]')
			.click('button[id=search-box-button]')
			.wait('#srp-list')
			.evaluate(() => document.URL)
		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
	})

	it('Can search for national city via typeahead and get to SRP', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[id=home]')
			.type('f', 'input[id=home]')
			.wait('.suggestionsList_1gynej2-o_O-homeSuggestionsList_1mpea8g')
			.press(40)
			.type('\r')
			.wait('#srp-list')
			.evaluate(() => document.URL)

		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/san-francisco-ca`)
	})

	it('Can search for featured neighborhood on locale page via typeahead get to SRP', async function () {
		this.timeout(70000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[id=home]')
			.type('Chandler', 'input[id=home]')
			.wait(3000)
			.wait('.suggestionsList_1gynej2-o_O-homeSuggestionsList_1mpea8g')
			.press(40)
			.type('\r')
			.wait('#srp-list')
			.evaluate(() => document.URL)

		await chromeless.end();
		expect(URL).toEqual(`${process.env.ORIGIN}/search/chandler-az`)
	})
})