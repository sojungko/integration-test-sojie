import { Chromeless } from 'chromeless'
import expect from 'expect'
require('dotenv').config({silent: true})
const CHROMELESS_OPTIONS = {debug: true}


describe('Search Functionality', async function() {
	it('Can search on homepage and get to SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.type('New York, NY\r', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			await expect(URL).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
	})

	it('Can search from SRP and get to another SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/atlanta-ga`)
			.wait('input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.type('Chicago, IL\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/chicago-il`)
		
		})

	it('Can search from LDP and get to SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/binder-ca?property_id=2593658897`)
			.wait('input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.type('Brooklyn\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/brooklyn-ny`)
		
	})


	it('Can search from article and get to SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/articles/essential-design-tips-every-renter-should-know`)
			.wait('input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.type('West Loop\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/chicago-il/west-loop`)
	})

	it('Can search using search button', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.type('New York, NY', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.click('button[class="searchButton_xb5mu5-o_O-homeSearchButton_1c55jrk"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)
			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
	})

	it('Can search for national city via typeahead and get to SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.type('f', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.wait('.suggestionsList_1gynej2-o_O-homeSuggestionsList_1mpea8g')
			.press(40)
			.type('\r')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/san-francisco-ca`)
	})

	it('Can search for featured neighborhood on locale page via typeahead get to SRP', async function () {
		this.timeout(50000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.type('Chandler', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.wait(3000)
			.wait('.suggestionsList_1gynej2-o_O-homeSuggestionsList_1mpea8g')
			.press(40)
			.type('\r')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			await chromeless.end();
			expect(URL).toEqual(`${process.env.ORIGIN}/search/chandler-az`)
	})
})