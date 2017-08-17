import { Chromeless } from 'chromeless'
import expect from 'expect'
require('dotenv').config({silent: true})
const CHROMELESS_OPTIONS = {debug: true}


describe('Search Functionality', async function() {
	it('Can search on homepage and get to SRP', async function () {
		// this.timeout(10000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/?locale=national`)
			.wait('input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.type('New York, NY\r', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			expect(URL).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
			await chromeless.end();
	})

	it('Can search from SRP and get to another SRP', async function () {
		// this.timeout(10000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/atlanta-ga`)
			.wait('input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.type('Chicago, IL\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			expect(URL).toEqual(`${process.env.ORIGIN}/search/chicago-il`)
			await chromeless.end();
		
		})

	it('Can search from LDP and get to SRP', async function () {
		// this.timeout(10000);
		const chromeless = new Chromeless(CHROMELESS_OPTIONS)
		const URL = await chromeless
			.goto(`${process.env.ORIGIN}/search/binder-ca?property_id=2593658897`)
			.wait('input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.type('Brooklyn\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
			.wait('.srpList_1sc4ubv')
			.evaluate(() => document.URL)

			expect(URL).toEqual(`${process.env.ORIGIN}/search/brooklyn-ny`)
			await chromeless.end();
		
	})


	// it('Can search from article and get to SRP', async function () {
	// 	const chromeless = new Chromeless()
	// 	console.log('starting...4')
	// 	return await chromeless
	// 		.goto(`${process.env.ORIGIN}/articles/essential-design-tips-every-renter-should-know`)
	// 		.type('West Loop\r', 'input[class="input_m7611f-o_O-navBarInput_1awpofx search-box-placeholder"]')
	// 		.wait(3000)
	// 		.evaluate(() => document.URL)
	// 		.end()
	// 		.then(res => {
	// 			console.log('res', res)
	// 			expect(res).toEqual(`${process.env.ORIGIN}/search/chicago-il/west-loop`)
	// 			return
	// 		})
	// })

	// it('Can search using search button', async function () {
	// 	const chromeless = new Chromeless()
	// 	console.log('starting...5')
	// 	return await chromeless
	// 		.goto(`${process.env.ORIGIN}/?locale=national`)
	// 		.type('New York, NY', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
	// 		.click('button[class="searchButton_xb5mu5-o_O-homeSearchButton_1c55jrk"]')
	// 		.wait(3000)
	// 		.evaluate(() => document.URL)
	// 		.end()
	// 		.then(res => {
	// 			console.log('res', res)
	// 			expect(res).toEqual(`${process.env.ORIGIN}/search/new-york-ny`)
	// 			return
	// 		})
	// })

	// it('Can search for national city via typeahead and get to SRP', async function () {
	// 	const chromeless = new Chromeless()
	// 	console.log('starting...6')
	// 	return await chromeless
	// 		.goto(`${process.env.ORIGIN}/?locale=national`)
	// 		.type('f', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
	// 		.wait(2000)
	// 		.press(40)
	// 		.wait(2000)
	// 		.type('\r')
	// 		.wait(3000)
	// 		.evaluate(() => document.URL)
	// 		.end()
	// 		.then(res => {
	// 			console.log('res', res)
	// 			expect(res).toEqual(`${process.env.ORIGIN}/search/san-francisco-ca`)
	// 			return
	// 		})
	// })

	// it('Can search for featured neighborhood on locale page via typeahead get to SRP', async function () {
	// 	const chromeless = new Chromeless()
	// 	console.log('starting...7')
	// 	return await chromeless
	// 		.goto(`${process.env.ORIGIN}/?locale=phoenix-az`)
	// 		.type('Chandler', 'input[class="input_m7611f-o_O-homeInput_1euh3ve search-box-placeholder"]')
	// 		.wait(2000)
	// 		.press(40)
	// 		.wait(2000)
	// 		.type('\r')
	// 		.wait(3000)
	// 		.evaluate(() => document.URL)
	// 		.end()
	// 		.then(res => {
	// 			console.log('res', res)
	// 			expect(res).toEqual(`${process.env.ORIGIN}/search/chandler-az`)
	// 			return
	// 		})
	// })
})