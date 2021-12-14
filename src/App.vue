<template>
    <nav class="navbar navbar-expand-lg navbar-custom bg-dark">
        <div class="container">
            <router-link
                to="/"
                class="navbar-brand"
                id="make-active-nav-item"
                @click="changeActiveNavItem"
                >Restaurants Searcher</router-link
            >
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link"
                            >Support</router-link
                        >
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link"
                            >Contact</router-link
                        >
                    </li>
                </ul>
            </div>

            <form
                id="searching-form"
                class=""
                @submit="searchRestaurantsSubmit"
            >
                <div class="search">
                    <svg
                        id="tiny_loader"
                        viewBox="0 0 90 90"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            id="c"
                            fill="none"
                            stroke-width="6px"
                            stroke-linecap="round"
                            stroke="#37e2a4"
                            cx="45"
                            cy="45"
                            r="20"
                        />
                    </svg>
                    <fa id="search-icon" icon="search" />
                    <input
                        id="navbar-search-input"
                        type="text"
                        class="form-control"
                        placeholder="City/Town Name"
                        v-model="search_value_in_navbar_search_input"
                        ref="autocomplete"
                    />
                </div>
            </form>
        </div>
    </nav>

    <div class="container mt-5">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { SearchResult } from "@/interfaces/SearchResults";
import { createSearchResult } from "@/services/SearchResultsServices";
import { getSearchResults } from "@/services/SearchResultsServices";

declare global {
    interface Window {
        google: any;
    }
}

export default defineComponent({
    name: "App",
    components: {},
    data() {
        return {
            search_result: {} as SearchResult,
            search_results_all: [] as SearchResult[],
            search_result_current: {} as SearchResult,
            search_result_found: {} as SearchResult,

            //Just data for fix bug go to line 2211.
            search_result_second: {
                _id: "61b85904d48eccd1874b1ba2",
                search_value: "Bangkok",
                places: [
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7626533,
                                lng: 100.4993494,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7640797802915,
                                    lng: 100.5007555302915,
                                },
                                southwest: {
                                    lat: 13.7613818197085,
                                    lng: 100.4980575697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Nouvo City Hotel - โรงแรมนูโว ซิตี",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 2592,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/104446361469716620348">Nouvo City Hotel</a>',
                                ],
                                photo_reference:
                                    "Aap_uECLK-QWsjLCc_dQHrs-K_NbvcC5_zLXoKvC_U3Kl858wpP1Ul8c-5NPqRxizTrg-gKgbrvIPmRL2RieOVki9X4shq2hiiAD3M_8N4dyZ7cH3IsfQsGMwzprFTpAYyh5kCeWkrcgAYZvXkl3yIDCRKxFeN3KbgXWGNi2gMTIxxhzL1hM",
                                width: 3872,
                            },
                        ],
                        place_id: "ChIJxe-mTmyZ4jARWrqTyaeZmwY",
                        plus_code: {
                            compound_code: "QF7X+3P Bangkok, Thailand",
                            global_code: "7P52QF7X+3P",
                        },
                        rating: 4.3,
                        reference: "ChIJxe-mTmyZ4jARWrqTyaeZmwY",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 2029,
                        vicinity: "2 Thanon Samsen, Phranakorn",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.761561,
                                lng: 100.504463,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7629812802915,
                                    lng: 100.5057805302915,
                                },
                                southwest: {
                                    lat: 13.7602833197085,
                                    lng: 100.5030825697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Hotel De'Moc",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 3024,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/101396269741836685799">Rolf Alberts</a>',
                                ],
                                photo_reference:
                                    "Aap_uEAjGGI_1kUpvXS7oiGUBIpw2utuWRcNCLjPi7F7ScjzbVTfPUCdUacBn1r52nJw5aNzsuf5q29Htu68nhG2titmLhKbu6JaKvr6mJucQgHLZxmW48mrkmxQl9iPvL7MXKtLhVu0Lw7a8yelv1WBM15R2XJdtvoaj9d2w8ZBlr1wsec",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJEb54VWqZ4jARN6AG3cvxg7k",
                        plus_code: {
                            compound_code: "QG63+JQ Bangkok, Thailand",
                            global_code: "7P52QG63+JQ",
                        },
                        rating: 3.7,
                        reference: "ChIJEb54VWqZ4jARN6AG3cvxg7k",
                        scope: "GOOGLE",
                        types: [
                            "cafe",
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 580,
                        vicinity: "Ban Phan Thom, Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7603477,
                                lng: 100.4984281,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7616399802915,
                                    lng: 100.4997438802915,
                                },
                                southwest: {
                                    lat: 13.7589420197085,
                                    lng: 100.4970459197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ไทยโคซี่เฮาส์ ร้านอาหาร",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJzQ2dF22Z4jARYUBibFBet_8",
                        plus_code: {
                            compound_code: "QF6X+49 Bangkok, Thailand",
                            global_code: "7P52QF6X+49",
                        },
                        rating: 4.2,
                        reference: "ChIJzQ2dF22Z4jARYUBibFBet_8",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 5,
                        vicinity:
                            "111/1-3 ตานี Tani, Khwaeng Talat Yot, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7448231,
                                lng: 100.491302,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7461441802915,
                                    lng: 100.4926866802915,
                                },
                                southwest: {
                                    lat: 13.7434462197085,
                                    lng: 100.4899887197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "The Deck by Arun Residence",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1344,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/117630498708011603488">The Deck by Arun Residence</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDD_elZkCm7YGwIBTpgJjbm_4WUDoSLpWaAsA-DrVhLMzKqzsvdnlHfUMBPMB6HsJh8Eik8PiLa62y2Qbl1ocdT52ziFaYQnDhZP7NPEl8Td3TIciBTbV61b-FfRoorhqK-qoRbUJ0m2_mT8aXzrQS701iK6W0BH7BtHH43TSqMyTHi",
                                width: 2016,
                            },
                        ],
                        place_id: "ChIJX3aTlQuZ4jARuBMJ5me3lUY",
                        plus_code: {
                            compound_code: "PFVR+WG Bangkok, Thailand",
                            global_code: "7P52PFVR+WG",
                        },
                        price_level: 2,
                        rating: 4.2,
                        reference: "ChIJX3aTlQuZ4jARuBMJ5me3lUY",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 1218,
                        vicinity:
                            "36-38 Soi Pratu Nokyung, Khwaeng Phra Borom Maha Ratchawang, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7548,
                                lng: 100.4865068,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7561407802915,
                                    lng: 100.4878546802915,
                                },
                                southwest: {
                                    lat: 13.7534428197085,
                                    lng: 100.4851567197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Baan Wanglang Riverside, Bangkok",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1672,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114296889079755030109">ฺBaan Wanglang Riverside บ้านวังหลัง ริเวอร์ไซด์</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBQwzRDswAwi481GP1p8MfT5W2DuvyEUd7lpVUauWV5ee2gvguq6LCrOOMdy6PlYXcnLJ5GfRm6RoV3Xo9JxpN2C7ZZNWfe0DOaMNLOeNS3n3xgg68KWDZ1AIE9Vw2csvB16mhPCzEi4VWMRhe831YEtO9VNdF6HaWq6IXxmNw2J1ib",
                                width: 2506,
                            },
                        ],
                        place_id: "ChIJHWUWJQqZ4jARAtfHR_Zqabs",
                        plus_code: {
                            compound_code: "QF3P+WJ Bangkok, Thailand",
                            global_code: "7P52QF3P+WJ",
                        },
                        rating: 4.4,
                        reference: "ChIJHWUWJQqZ4jARAtfHR_Zqabs",
                        scope: "GOOGLE",
                        types: [
                            "cafe",
                            "lodging",
                            "bar",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 437,
                        vicinity:
                            "ริมแม่น้ำกรุงเทพ, 342 Soi Trok Watrakhang, Khwaeng Siriraj, Khet Bangkok Noi",
                    },
                    {
                        business_status: "CLOSED_TEMPORARILY",
                        geometry: {
                            location: {
                                lat: 13.745547,
                                lng: 100.4915491,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7469242802915,
                                    lng: 100.4929473802915,
                                },
                                southwest: {
                                    lat: 13.7442263197085,
                                    lng: 100.4902494197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "อารมณ์ดีโฮสเทล",
                        permanently_closed: true,
                        photos: [
                            {
                                height: 960,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114812607575013032311">Arom D Cafe / Hostel</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBRwHfwziTwRASpn0sAZUw4lMXS-BpBNaWEhy-Xd4cD_3z5gmNTb5VvbgN6s4z27lBYRA1o7Yecu8ziiu8bS6SxRJlZS7xHcF205ao6sxRl140CCNBmC7mMATiDrv4oqJolvLAAGxqLVIn6jce6KIwt3WRkI0oI-TeKTEMEuB6kWNFb",
                                width: 720,
                            },
                        ],
                        place_id: "ChIJBRzLxwWZ4jARkAuUTTF45w0",
                        plus_code: {
                            compound_code: "PFWR+6J Bangkok, Thailand",
                            global_code: "7P52PFWR+6J",
                        },
                        rating: 4,
                        reference: "ChIJBRzLxwWZ4jARkAuUTTF45w0",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 158,
                        vicinity:
                            "336 Maha Rat Road, Khwaeng Phra Borom Maha Ratchawang, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7606499,
                                lng: 100.4990573,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7619664802915,
                                    lng: 100.5003883302915,
                                },
                                southwest: {
                                    lat: 13.7592685197085,
                                    lng: 100.4976903697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Suneta Hostel Khaosan",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 480,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/118177694853503687970">Suneta Hostel Khaosan</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBEOH444d-Ku75cdLvFiLhhcxUX07khzB-IrMbe-zvRPWUaH-X6bH0WrXXvp82kHxi_tmyNFu4C33hgukMuqGr1YmFmXlQyjid9gpMiBTeYbxlccxyTZDMp8JuigUuV4GCzBHjN7fAM8pqCMttI3P3q5XdZL2C89RCk1rCaNe-vB23M",
                                width: 720,
                            },
                        ],
                        place_id: "ChIJ4efi42yZ4jARJaK9LY3l278",
                        plus_code: {
                            compound_code: "QF6X+7J Bangkok, Thailand",
                            global_code: "7P52QF6X+7J",
                        },
                        rating: 4.5,
                        reference: "ChIJ4efi42yZ4jARJaK9LY3l278",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 231,
                        vicinity:
                            "209-211, 213 Soi Kraisi, Khwaeng Talat Yot, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7450462,
                                lng: 100.4910947,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7463951802915,
                                    lng: 100.4924436802915,
                                },
                                southwest: {
                                    lat: 13.7436972197085,
                                    lng: 100.4897457197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Inn a day",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 5504,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/108630398068336107608">Danny</a>',
                                ],
                                photo_reference:
                                    "Aap_uEAHeeXfIMlYsTyWO6ciOHRkZuVOO1dsvgKE7yAgjeIHyTA0X37_D5eya0QiM0h_FZVWKAKHDMQ9WZVRapty066k85Co__76EJXLZu2wHwJHGHltaF9SVs5Vk7OOlZxK8lR0pROQ28foxjCgz5mQQuIyt9zktXk9liOLMWHhju8zs5eK",
                                width: 8256,
                            },
                        ],
                        place_id: "ChIJPeRZzQWZ4jARS-HOvDlcOI0",
                        plus_code: {
                            compound_code: "PFWR+2C Bangkok, Thailand",
                            global_code: "7P52PFWR+2C",
                        },
                        rating: 4.7,
                        reference: "ChIJPeRZzQWZ4jARS-HOvDlcOI0",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 278,
                        vicinity: "61 Maha Rat Road, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7453545,
                                lng: 100.4909373,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7466965802915,
                                    lng: 100.4923532802915,
                                },
                                southwest: {
                                    lat: 13.7439986197085,
                                    lng: 100.4896553197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "sala rattanakosin Bangkok",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1460,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/103781606221740529556">sala rattanakosin Bangkok</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBq4gJ4idR0mFMnkyXq1Xa-C-PNGQDhvIEQrbjYIQdK_-ApQWoBF0Kj_y2bGs_VZPflrjaGX3BZzd8E-0w6Q4o7GR2VoHx-YAdL9ACi3cFcHFNP4LXNoJITA_gOJURbB6wY9FdFhtWeC52HwovHOdorxlJQavp30BmyhjYarMFgiQ_o",
                                width: 1825,
                            },
                        ],
                        place_id: "ChIJGfUu0gWZ4jARv_y-6ikKmIA",
                        plus_code: {
                            compound_code: "PFWR+49 Bangkok, Thailand",
                            global_code: "7P52PFWR+49",
                        },
                        rating: 4.2,
                        reference: "ChIJGfUu0gWZ4jARv_y-6ikKmIA",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "bar",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 1102,
                        vicinity:
                            "39 Maha Rat Road, Khwaeng Phra Borom Maha Ratchawang, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7615742,
                                lng: 100.5000069,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7627260802915,
                                    lng: 100.5012358802915,
                                },
                                southwest: {
                                    lat: 13.7600281197085,
                                    lng: 100.4985379197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Korbua House",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1108,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/117316270736971811476">บ้านกอบัว</a>',
                                ],
                                photo_reference:
                                    "Aap_uEB3FbLKncjkkQevyy9_EiNYC1LyUD81wCZuQGS4HpJ53xI10Gk86ZgIntf_D-HYLFiedrDAt7VDVX2qTrmmU2mxuMzalEr3v3wdNoHKGiyzHbDfUNE-CySVXxmlDgmyQzKnK3d5BWYERf5TwPcSjC43IuKHpYpfok_Lt1SfyMT8-BUz",
                                width: 1477,
                            },
                        ],
                        place_id: "ChIJTeoJ9WyZ4jARa4N2WyxtNJM",
                        plus_code: {
                            compound_code: "QG62+J2 Bangkok, Thailand",
                            global_code: "7P52QG62+J2",
                        },
                        rating: 4,
                        reference: "ChIJTeoJ9WyZ4jARa4N2WyxtNJM",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 178,
                        vicinity: "239/8 Thanon Phra Sumen, TALADYOD, PHANAKON",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7629806,
                                lng: 100.494514,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7642944302915,
                                    lng: 100.4958932302915,
                                },
                                southwest: {
                                    lat: 13.7615964697085,
                                    lng: 100.4931952697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "Navalai River Resort",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1360,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114993267233620758751">Navalai River Resort</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDo2SRS9Es-y31KR35ZMB5Oz8zX7cGEsOQYaok_UbnJDL_z-I9RfF3cbXD7LNXUIR3s7j1yOWGYs3tJVPQc-QS8s5w8vW7Mrgd5WBn9ky3e4HSa7w4dYZQ8nYsEZzPPdtKcBnmjwk4mfiL6aQ31psbIFXdRWqQFs72Ush_MAyUZmtaa",
                                width: 2048,
                            },
                        ],
                        place_id: "ChIJR59KQHKZ4jARcyQI0D8Ttqo",
                        plus_code: {
                            compound_code: "QF7V+5R Bangkok, Thailand",
                            global_code: "7P52QF7V+5R",
                        },
                        rating: 4.2,
                        reference: "ChIJR59KQHKZ4jARcyQI0D8Ttqo",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 770,
                        vicinity:
                            "45/1-2 Thanon Phra Athit, Khwaeng Chana Songkhram, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7527755,
                                lng: 100.5007284,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7541180302915,
                                    lng: 100.5018639802915,
                                },
                                southwest: {
                                    lat: 13.7514200697085,
                                    lng: 100.4991660197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ย้ง ก๋วยเตี๋ยวลูกชิ้นปลา",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 768,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/107860115148698940483">Nok Dee</a>',
                                ],
                                photo_reference:
                                    "Aap_uED4X4cT56AZjtRDRH7NlKex14mXrKP8SPIyi24mKgsxLqIX2NHHxBDdn2OVelezbwDYDlmaxOGGOuCFgkuvib7TJnMiUAOtADryM9Fp4XwCNGPtrgGWh2OjpVkF2-NTnIcpABx4PeHSyq1AmfGWlOGTav2PfpUUM9XRqhDaXYLv7PDi",
                                width: 768,
                            },
                        ],
                        place_id: "ChIJE_pbWRGZ4jARftvPzgsLno4",
                        plus_code: {
                            compound_code: "QG32+47 Bangkok, Thailand",
                            global_code: "7P52QG32+47",
                        },
                        rating: 4.6,
                        reference: "ChIJE_pbWRGZ4jARftvPzgsLno4",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 8,
                        vicinity:
                            "43/3 Soi Manhannop 1, เสาชิงช้า, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7515367,
                                lng: 100.4976536,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7528221302915,
                                    lng: 100.4990111302915,
                                },
                                southwest: {
                                    lat: 13.7501241697085,
                                    lng: 100.4963131697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Pom Potchana",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJ74lAvxGZ4jAR5vAjUoXFKBI",
                        plus_code: {
                            compound_code: "QF2X+J3 Bangkok, Thailand",
                            global_code: "7P52QF2X+J3",
                        },
                        reference: "ChIJ74lAvxGZ4jAR5vAjUoXFKBI",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        vicinity:
                            "43 Thanon Bamrung Mueang, Khwaeng San Chao Pho Sua, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7520911,
                                lng: 100.4965266,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7535819802915,
                                    lng: 100.4978598802915,
                                },
                                southwest: {
                                    lat: 13.7508840197085,
                                    lng: 100.4951619197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Tomyam Man Samong Moo Chao Kao",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 960,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/109031711762812294594">วีรสิทธิ์ มีอําพล</a>',
                                ],
                                photo_reference:
                                    "Aap_uEB-ljvYuYzBDd5PLG6iopjuhIzV0bvQp2rylgAFI1iGrivhmA1fvzpwlZCvyNf0afm9_vhUT6wKNpbc4XG8hopg-lQMUmPKctI3Ki507HU_iBldYGXex83z0aTEvlnqB0aXpzNV6DZo4hceql3bg13uSKObmsykFadWFCFVaSGWcf--",
                                width: 886,
                            },
                        ],
                        place_id: "ChIJc97l5xGZ4jARPm06nA4sqOU",
                        plus_code: {
                            compound_code: "QF2W+RJ Bangkok, Thailand",
                            global_code: "7P52QF2W+RJ",
                        },
                        rating: 4.1,
                        reference: "ChIJc97l5xGZ4jARPm06nA4sqOU",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 8,
                        vicinity:
                            "12 Phraeng Nara Road, Khwaeng San Chao Pho Sua, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7526785,
                                lng: 100.4893907,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7540233802915,
                                    lng: 100.4907896802915,
                                },
                                southwest: {
                                    lat: 13.7513254197085,
                                    lng: 100.4880917197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Thong Hong Lee",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 809,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/103798054043835889583">ท่งเฮงหลี (Thong Heng Lee Restaurant)</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBKJb5dgn9TTrKsux0QheUq0xWzcv6OibdOodGXJ9rvvf0TY3Eio1eIU6ZaXYQwddeUwqbJp8U3Q6K1CYVuXVMDw-AWQdrBrLCVmKsMoKqiv7Z-aMoAPjvNEeel9lH8VEzm8FOi5ZQzfmnU4Y3GvfaiaU5rDg9sefJdEBEr8eYqkJmm",
                                width: 1440,
                            },
                        ],
                        place_id: "ChIJqda0RQmZ4jAR861kobU9SaE",
                        plus_code: {
                            compound_code: "QF3Q+3Q Bangkok, Thailand",
                            global_code: "7P52QF3Q+3Q",
                        },
                        rating: 4.8,
                        reference: "ChIJqda0RQmZ4jAR861kobU9SaE",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 56,
                        vicinity:
                            "192, 194 Maha Rat Road, Khwaeng Phra Borom Maha Ratchawang, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.743526,
                                lng: 100.496833,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7447487302915,
                                    lng: 100.4981680302915,
                                },
                                southwest: {
                                    lat: 13.7420507697085,
                                    lng: 100.4954700697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Thaweephol",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJeQtqORuZ4jARy6wjUKOkoPM",
                        plus_code: {
                            compound_code: "PFVW+CP Bangkok, Thailand",
                            global_code: "7P52PFVW+CP",
                        },
                        reference: "ChIJeQtqORuZ4jARy6wjUKOkoPM",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        vicinity:
                            "25 Thanon Ban Mo, Khwaeng Wang Burapha Phirom, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7527985,
                                lng: 100.4976814,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7541474802915,
                                    lng: 100.4990303802915,
                                },
                                southwest: {
                                    lat: 13.7514495197085,
                                    lng: 100.4963324197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Siri Potchana",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 3024,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/103350560280703313592">Itsara Ariyaeakanun</a>',
                                ],
                                photo_reference:
                                    "Aap_uEC8ZdxuLZqwA59ve-yBrZZ0aNOQaC7stKXGvRM7h_3NFY7bF3wgpnAmQ_VoTJ1GBGsb2vIayLQdZWiPfV_AlNVkjsubT4_57ypAlxuo3D1kZC4G6dz60NvckYHhVdbDzf_waMdYnu1Un2u_5FMxIsyCr94-mvFrJ2c7pRDO1LpOG9gF",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJRyyOFBKZ4jARBHVtKNI6o28",
                        plus_code: {
                            compound_code: "QF3X+43 Bangkok, Thailand",
                            global_code: "7P52QF3X+43",
                        },
                        rating: 4.1,
                        reference: "ChIJRyyOFBKZ4jARBHVtKNI6o28",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 85,
                        vicinity:
                            "18 Thanon Burana Sat, Khwaeng San Chao Pho Sua, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7563162,
                                lng: 100.4892946,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7577200802915,
                                    lng: 100.4906340802915,
                                },
                                southwest: {
                                    lat: 13.7550221197085,
                                    lng: 100.4879361197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Mit Potchana",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 2016,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/105683066670723216793">Nava N</a>',
                                ],
                                photo_reference:
                                    "Aap_uEByDmpPn9QIzxY0z0YnwpfCZ6v7C4LIoPEEDGWWI5DmOCYkVZDnHmUbggD-M4-s7oRB_H5t8Oaz6GErs9OFckUILm-d05OHUv6YwN9Pwwf_HF5BU-y-9TTQCi1gdv55oSDEvoyz7KPO24VhZR5a82XIYG4VCFrKCPMBRou9JiPvimQj",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJZWvbnQuZ4jARZXnLiyOB-YY",
                        plus_code: {
                            compound_code: "QF4Q+GP Bangkok, Thailand",
                            global_code: "7P52QF4Q+GP",
                        },
                        rating: 4,
                        reference: "ChIJZWvbnQuZ4jARZXnLiyOB-YY",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 62,
                        vicinity:
                            "49 Soi Phra Chan, Khwaeng Phra Borom Maha Ratchawang, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7428758,
                                lng: 100.4961416,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7441907302915,
                                    lng: 100.4974990802915,
                                },
                                southwest: {
                                    lat: 13.7414927697085,
                                    lng: 100.4948011197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Porncharoen",
                        place_id: "ChIJnTHgGhmZ4jARlAkAeg5bagg",
                        plus_code: {
                            compound_code: "PFVW+5F Bangkok, Thailand",
                            global_code: "7P52PFVW+5F",
                        },
                        rating: 4,
                        reference: "ChIJnTHgGhmZ4jARlAkAeg5bagg",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 1,
                        vicinity:
                            "68/1 Kok Nam, Khwaeng Wang Burapha Phirom, Khet Phra Nakhon",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 13.7422278,
                                lng: 100.5072633,
                            },
                            viewport: {
                                northeast: {
                                    lat: 13.7435174802915,
                                    lng: 100.5085411802915,
                                },
                                southwest: {
                                    lat: 13.7408195197085,
                                    lng: 100.5058432197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "KP Suki and Restaurant",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJm7DlCCKZ4jARTu64sR6Uqok",
                        plus_code: {
                            compound_code: "PGR4+VW Bangkok, Thailand",
                            global_code: "7P52PGR4+VW",
                        },
                        reference: "ChIJm7DlCCKZ4jARTu64sR6Uqok",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        vicinity:
                            "229 ถนน เยาวราช, Khwaeng Samphanthawong, Khet Samphanthawong",
                    },
                ],
            } as SearchResult,
            search_result_first: {
                _id: "61b855741c664a23192a076c",
                search_value: "Khon Kaen",
                places: [
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.433785,
                                lng: 102.853735,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4352164302915,
                                    lng: 102.8548954302915,
                                },
                                southwest: {
                                    lat: 16.4325184697085,
                                    lng: 102.8521974697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                        icon_background_color: "#909CE1",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                        name: "โรงแรม ลาวิลล่า ขอนแก่น - Hotel La Villa KhonKaen",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 641,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/113476560601872484925">โรงแรม ลาวิลล่า ขอนแก่น - Hotel La Villa KhonKaen</a>',
                                ],
                                photo_reference:
                                    "Aap_uEC9YH-dYRmZ-iNzitLT-B2yOEPdd9ktEh4Xn46cQkAEKXnGenwAYVnWG75HxCHoDT5Hyz0qNXCmv3RrGH_FPKYClBQPo9gV66euv2-z7Cs3c_WajVsuGUUCHWBVM1VYxsDhG4E4EZoXNAN_Q3KugDjapX4wPnIqc0g6VbU1TWQCersV",
                                width: 641,
                            },
                        ],
                        place_id: "ChIJiaga_cyLIjERHONgSu5ot4M",
                        plus_code: {
                            compound_code:
                                "CVM3+GF Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CVM3+GF",
                        },
                        rating: 4,
                        reference: "ChIJiaga_cyLIjERHONgSu5ot4M",
                        scope: "GOOGLE",
                        types: [
                            "lodging",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 330,
                        vicinity:
                            "116, 104-106 Chata Phadung Road, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4125022,
                                lng: 102.8596954,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4139228302915,
                                    lng: 102.8609456802915,
                                },
                                southwest: {
                                    lat: 16.4112248697085,
                                    lng: 102.8582477197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Supanniga Home Boutique Hideaway Hotel",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 684,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114531311083604256136">สุพรรณิการ์โฮม บูติค ไฮอะเวย์ : ร้านอาหารไทย บ้านต้นไม้ ห้องชา</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBxN6qarkbtsYUdXrYpiW8QyqIx6xQHjQ3Hbta6K0SbphxjyxOMK9U6UQ1NBQMCmT9n45VH-UMjTrK-B-pjOSgzZ03htv_TjjEt3yZei_Q0xOIrML5XTRc7pjaqRJQ2y0kIl_zGb5idBrzYZqT83HdjNthfpg0E6thOJrD6iU0Qo1_g",
                                width: 1030,
                            },
                        ],
                        place_id: "ChIJgS_ShDqKIjERDk-PNJ8o1mQ",
                        plus_code: {
                            compound_code:
                                "CV75+2V Phra Lap, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CV75+2V",
                        },
                        rating: 4.4,
                        reference: "ChIJgS_ShDqKIjERDk-PNJ8o1mQ",
                        scope: "GOOGLE",
                        types: [
                            "cafe",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 167,
                        vicinity:
                            "130/9 Phothisan Road, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.420498,
                                lng: 102.837757,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4218464802915,
                                    lng: 102.8391155802915,
                                },
                                southwest: {
                                    lat: 16.4191485197085,
                                    lng: 102.8364176197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Tik Jaew Hon",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 3456,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/102823785128618608854">7HC HC</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDfCfXRWGKTRKAS3plqFe_hWgcfjIXWrP0B-qoKbaWruqvSSpGWFh0vpCSBJWOqj1fLLsT1ksYCpdyMFMJmHIAFfcMuVjdFcbiqPwTOmoDpAJHGb25hiNApIHg3kTwRHvMdFtXS-vl4WFMBaFJHPLgzQFpd5slLjH2yMIGIjNWgFVfN",
                                width: 4608,
                            },
                        ],
                        place_id: "ChIJzUdohieKIjERt-jiTAkkuJA",
                        plus_code: {
                            compound_code:
                                "CRCQ+54 Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRCQ+54",
                        },
                        price_level: 1,
                        rating: 4.1,
                        reference: "ChIJzUdohieKIjERt-jiTAkkuJA",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 365,
                        vicinity: "14, 33/12, ในเมือง, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4107718,
                                lng: 102.8348291,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4120921802915,
                                    lng: 102.8361334302915,
                                },
                                southwest: {
                                    lat: 16.4093942197085,
                                    lng: 102.8334354697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Krua Nong Lek",
                        place_id: "ChIJGeomco6JIjERdsIJpcCeyTc",
                        rating: 3,
                        reference: "ChIJGeomco6JIjERdsIJpcCeyTc",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 1,
                        vicinity: "CR6M+8W4, Mueang Khon Kaen District",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.3881853,
                                lng: 102.7087286,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.3895733802915,
                                    lng: 102.7100760302915,
                                },
                                southwest: {
                                    lat: 16.3868754197085,
                                    lng: 102.7073780697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Nong Phum Restaurant",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJTX8tTXlkIjEREqLS5qH-jpQ",
                        plus_code: {
                            compound_code:
                                "9PQ5+7F Ban Wa, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P849PQ5+7F",
                        },
                        rating: 5,
                        reference: "ChIJTX8tTXlkIjEREqLS5qH-jpQ",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 1,
                        vicinity:
                            "99, 99/1 ถนน Sri Chant, ตำบล ในเมือง, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.427418,
                                lng: 102.821812,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4288078302915,
                                    lng: 102.8231700302915,
                                },
                                southwest: {
                                    lat: 16.4261098697085,
                                    lng: 102.8204720697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ขาหมูสามเหลี่ยม",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 4032,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/100000080034300247547">LeoAop</a>',
                                ],
                                photo_reference:
                                    "Aap_uEAMJNTpD9ZlaCZAvyMjdJXwKIXFGiY3RXOShvmVg_FZab9pev9Gofx6VA9Bp6UaCVCoAq6wKTsTadhnsJnqFlXpQzDEhAoVmukXcK-8WOHTXSX1aTiJnjt_siTigYFecSs1lG3vo1e6rkJBoVauJ9d02P_1VtZ-TzuaMKCQ3FBnDQ4",
                                width: 3024,
                            },
                        ],
                        place_id: "ChIJ6R_Z9huKIjERQxDk7W1-T5s",
                        plus_code: {
                            compound_code:
                                "CRGC+XP Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRGC+XP",
                        },
                        price_level: 1,
                        rating: 4,
                        reference: "ChIJ6R_Z9huKIjERQxDk7W1-T5s",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 134,
                        vicinity:
                            "291/49 Thanon Mittraphap, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4254057,
                                lng: 102.8347635,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4268251302915,
                                    lng: 102.8361172302915,
                                },
                                southwest: {
                                    lat: 16.42412716970849,
                                    lng: 102.8334192697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "กระยาทิพย์",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 3024,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/115004260293679391823">CATWALK BakeryandCoffee</a>',
                                ],
                                photo_reference:
                                    "Aap_uECZ9UX46y350yhSMz-rU2jXJNK28xA26heo_W87-uIxw-qaoQO5qONM9rSUFA3J1aMjoWZi69AXFtDSMCXmQX9aTxYFzJEYkjysIakbHi8qnpU5WxTFpxAVIw8Cnr04oQdApyODnQyxjrk-Cyj_uPIiTFhmy25pwgZZ0D3WUFEUr4Gp",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJqV3uryaKIjEROY0gDyKT43U",
                        plus_code: {
                            compound_code:
                                "CRGM+5W Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRGM+5W",
                        },
                        rating: 3.9,
                        reference: "ChIJqV3uryaKIjEROY0gDyKT43U",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 22,
                        vicinity: "3-4 Ruen Rom, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4235677,
                                lng: 102.8372294,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4249193802915,
                                    lng: 102.8385158802915,
                                },
                                southwest: {
                                    lat: 16.4222214197085,
                                    lng: 102.8358179197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ร้านเฝอท่าบ่อ",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 4032,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/106575057779710386025">Warodom Buacharoen</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDlfxJMaG0603MixXy4C_iNuYSBezCcd9lOYQmJFVaShusOikIp3w4Xd8ONlgBgGjZxUTOnFchIPZhsjDx6nBXgbjkz4_ve0Vo09IY-0sa9c4tSNxdV2RzUpN56m2ZlBViwqCw4XQ0GVr9iD37rc4unTrOchwXf154cBg6BcRav-vaX",
                                width: 3024,
                            },
                        ],
                        place_id: "ChIJi-YjVSaKIjERacw-Bd-Zw9I",
                        plus_code: {
                            compound_code:
                                "CRFP+CV Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRFP+CV",
                        },
                        price_level: 2,
                        rating: 4.2,
                        reference: "ChIJi-YjVSaKIjERacw-Bd-Zw9I",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 342,
                        vicinity: "3, 12 ถ.ศรีนวล, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4166332,
                                lng: 102.8340772,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4179789802915,
                                    lng: 102.8354824802915,
                                },
                                southwest: {
                                    lat: 16.41528101970849,
                                    lng: 102.8327845197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Pa Ouan Potchana 1",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 5520,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/105242514645430361966">Moo Oot</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDxmuXEzFjtyD9KQELNXomnR67BY3vXRFL-XQGtu3-JtPK2hQr9sI3FObkcUjtMr14K6MxbNnivqmYttxqLHoccGSxAKyyswhzo7mJKU4pLydxhgK_W57q2oq3JeDkJ-K9_OCWkK1xiMTorbTsd_J6hH3ovFp5S3PfD18Ax69XVLW-6",
                                width: 4140,
                            },
                        ],
                        place_id: "ChIJT7fi2IuJIjER6aNIvAoENw8",
                        plus_code: {
                            compound_code:
                                "CR8M+MJ Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CR8M+MJ",
                        },
                        rating: 3.8,
                        reference: "ChIJT7fi2IuJIjER6aNIvAoENw8",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 12,
                        vicinity:
                            "344 Thanon Klang Mueang, Tambon Nai Mueang, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4169476,
                                lng: 102.8410928,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4182919302915,
                                    lng: 102.8423991802915,
                                },
                                southwest: {
                                    lat: 16.4155939697085,
                                    lng: 102.8397012197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Krua Puan Restaurant",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 3264,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/102386422518057471685">สันติ บุสทิพย์</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBXWyuSHOk_oA24yALW0G3KlMBohi6KJW4QTAKogxKQMjuh-9S-PFXpmtu3TcFb1wlHMZUq5iOsY5lOMfz3T86HEpyFQszrEBd6va1FoXapve5Tp-GyOgHOXw48C_ydp99tKmYfg0no1FBlnlk-S3cl3EnEexta04hYiXRUpSnyJbYM",
                                width: 2448,
                            },
                        ],
                        place_id: "ChIJ_YEXNIaJIjERNjpXPT1poms",
                        plus_code: {
                            compound_code:
                                "CR8R+QC Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CR8R+QC",
                        },
                        rating: 3.7,
                        reference: "ChIJ_YEXNIaJIjERNjpXPT1poms",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 15,
                        vicinity:
                            "142/39 Soi Rop Bueng 2, Tambon Nai Mueang, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.420568,
                                lng: 102.8393957,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4219357302915,
                                    lng: 102.8406972802915,
                                },
                                southwest: {
                                    lat: 16.4192377697085,
                                    lng: 102.8379993197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Pla Yai Pa Noi Muang Kao Restaurant",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 1836,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/113087355861895411956">shi miu</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDN5xEwU_7aliuFC777IjLDulZCOdxcRykCRUtGucZcWNnQILm_9C40LZ9PcYsq-6h2gFhuujOHV4zfhC3-uR1SP35f5WPhzsdEIopdeusSMgYzbpDEHnkVQX9d7LWSVS-aRLTpcBNa03xwbDKTAbHnRQAE4U9fDHxERRNb-73itoy0",
                                width: 3264,
                            },
                        ],
                        place_id: "ChIJ8-Kv-SeKIjERzcSIEZkn0wo",
                        rating: 3.7,
                        reference: "ChIJ8-Kv-SeKIjERzcSIEZkn0wo",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 18,
                        vicinity: "CRCQ+6QC, Mueang Khon Kaen District",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4225607,
                                lng: 102.8376524,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4239075302915,
                                    lng: 102.8387078802915,
                                },
                                southwest: {
                                    lat: 16.4212095697085,
                                    lng: 102.8360099197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Jum-Jim",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 895,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114931858266589490792">ธวัชชัย อังวราวงศ์</a>',
                                ],
                                photo_reference:
                                    "Aap_uEDwV2ocVAhoM4KCkvL0clWZ949uq_9zOfA7z1tKXbLVVKc64xBic0_gHdY0LT-xJPzwR1F3iMKkrzYQamrqdb_aTT6ZVJtoikaXS-CSzhKYDeNt67479eX8JeEByefjxglxZaKv6mkHw0SXKmX3bwxYCtoj5MdCr-zMUwOwXSuGP62H",
                                width: 1333,
                            },
                        ],
                        place_id: "ChIJx41BoSeKIjER6leYd_saMIg",
                        plus_code: {
                            compound_code:
                                "CRFQ+23 Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRFQ+23",
                        },
                        price_level: 2,
                        rating: 4.1,
                        reference: "ChIJx41BoSeKIjER6leYd_saMIg",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 242,
                        vicinity: "73/1 ถ.ศรีนวล, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4455224,
                                lng: 102.9597616,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4470614302915,
                                    lng: 102.9611805802915,
                                },
                                southwest: {
                                    lat: 16.4443634697085,
                                    lng: 102.9584826197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Ku Thong Rice Flour Noodle",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 2736,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114699830227326564524">สุภัทร ธนบดีภัทร</a>',
                                ],
                                photo_reference:
                                    "Aap_uEAa3raH-ewZ4EPd9HExjgw6G2_EESVP2VFD8nX0hqXum1yvvlXhoSL4UeS1BwF-6YZ8QSSbDKPOwJYf7ne8wEBEKloh6f5YVBMSSPwWgZuar-x28aANgmRmULaPuGVnHoV_2o4EwMqtDpyq6tdSQWSuWIp20CceauxGy8QeoVMQwuY7",
                                width: 3648,
                            },
                        ],
                        place_id: "ChIJu2q1bruNIjERFDdPInYwDyg",
                        plus_code: {
                            compound_code:
                                "CXW5+6W Ku Thong, Chiang Yuen District, Maha Sarakham, Thailand",
                            global_code: "7P84CXW5+6W",
                        },
                        price_level: 2,
                        rating: 3.8,
                        reference: "ChIJu2q1bruNIjERFDdPInYwDyg",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 937,
                        vicinity:
                            "112/16 บ้าน กู่ทอง, Tambon Ku Thong, Amphoe Chiang Yuen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4304997,
                                lng: 102.8318962,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4317446802915,
                                    lng: 102.8332340302915,
                                },
                                southwest: {
                                    lat: 16.4290467197085,
                                    lng: 102.8305360697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
                        icon_background_color: "#4B96F3",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
                        name: "Tukcom Khonkaen",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 4160,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/109661736059312381036">ตึกคอม ขอนแก่น</a>',
                                ],
                                photo_reference:
                                    "Aap_uECpI_BnDa2WIbQCllxF4vmmaRqDaRDclQTGuwO9k_FTm_IQd3Ut8VT3RrUWbca6F8umVW9GI7-RU4QAxzYXAkcd26JcLEUZLtK6Gw1zKxm8UIoWYeLI8qVf61OmNHiICm8tB1pFE2jrcYub67DcvIsd5rseM-DnroSdTfmPArVLFRW4",
                                width: 6240,
                            },
                        ],
                        place_id: "ChIJ8Tvd_iKKIjERPFoxNyjLLlM",
                        plus_code: {
                            compound_code:
                                "CRJJ+5Q Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRJJ+5Q",
                        },
                        rating: 4,
                        reference: "ChIJ8Tvd_iKKIjERPFoxNyjLLlM",
                        scope: "GOOGLE",
                        types: [
                            "shopping_mall",
                            "tourist_attraction",
                            "electronics_store",
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 1924,
                        vicinity:
                            "A, 250/1 ถ.ศรีจันทร์ (Sri Chan Rd ตำบลในเมือง (T.Nai Muang อ.เมือง, Muang",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4186173,
                                lng: 102.8180069,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4199350302915,
                                    lng: 102.8193438802915,
                                },
                                southwest: {
                                    lat: 16.4172370697085,
                                    lng: 102.8166459197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "กินดีตลาดต้นตาลขอนแก่น",
                        opening_hours: {
                            open_now: false,
                        },
                        photos: [
                            {
                                height: 2976,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/114530104203420650386">ananyolz Kithsuthikul</a>',
                                ],
                                photo_reference:
                                    "Aap_uEA3g0KnDONKJ9fx4X4FYxzzCemg-vuBlDoC5BQkppCWXqdBfqPRB1asjGDyTd-_xhw0OzGTxvMRfJy8XZcb-VMyzB-572XqiYk87lD0fdQtMwRzEwtKceu6egASjv_XNUa1sw5cEodbCDR9WKAjkxu8EgDiS1hlVBJBwoNLPZB1ZOfO",
                                width: 2976,
                            },
                        ],
                        place_id: "ChIJPcoNdveJIjERKDaCQBX4FVM",
                        plus_code: {
                            compound_code:
                                "CR99+C6 Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CR99+C6",
                        },
                        price_level: 1,
                        rating: 4.3,
                        reference: "ChIJPcoNdveJIjERKDaCQBX4FVM",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 195,
                        vicinity:
                            "ถ.มิตรภาพ ซอยบ้านกอก อ.เมือง จ.ขอนแก่น, ประเทศไทย, เมือง",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4816845,
                                lng: 102.8191831,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4829794802915,
                                    lng: 102.8206295802915,
                                },
                                southwest: {
                                    lat: 16.4802815197085,
                                    lng: 102.8179316197085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ครัวลุงแสง",
                        place_id: "ChIJgcwnQ5CKIjERZCnm661V7a8",
                        reference: "ChIJgcwnQ5CKIjERZCnm661V7a8",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        vicinity: "FRJ9+MMF, Mueang Khon Kaen District",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4317683,
                                lng: 102.8399799,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4331110802915,
                                    lng: 102.8413994302915,
                                },
                                southwest: {
                                    lat: 16.4304131197085,
                                    lng: 102.8387014697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "ร้าน ลาบเป็ด",
                        opening_hours: {
                            open_now: true,
                        },
                        place_id: "ChIJAQAAADCKIjERe83NNrSuTow",
                        reference: "ChIJAQAAADCKIjERe83NNrSuTow",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        vicinity: "40/60 มลิวรรณ, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4322306,
                                lng: 102.8254802,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4334767302915,
                                    lng: 102.8265566302915,
                                },
                                southwest: {
                                    lat: 16.43077876970849,
                                    lng: 102.8238586697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Sukishi Buffet",
                        photos: [
                            {
                                height: 3024,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/110779849418860928121">Elia Franke</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBiadf1yFkv-f6S83z04PRgzYPPP-w5o7bXTQD7i0EVDqpeEc6OHkqbaXPbL4ZvqrzI0bpwcDs8RCf2gc9ptPG99EgZoRkMSolserPN6y6WwOP0MZ2quqzW1QwmRUnCraboonfgrfFHRQuD2sM5xIyhweSGAi3tqbRNh6Ufpwqm50K5",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJw1YCfBeKIjER-CR1mRlDq6A",
                        plus_code: {
                            compound_code:
                                "CRJG+V5 Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRJG+V5",
                        },
                        price_level: 2,
                        rating: 3.6,
                        reference: "ChIJw1YCfBeKIjER-CR1mRlDq6A",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 43,
                        vicinity: "99 Sri Chant Road, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.4327253,
                                lng: 102.8263307,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4339951802915,
                                    lng: 102.8277552302915,
                                },
                                southwest: {
                                    lat: 16.4312972197085,
                                    lng: 102.8250572697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Mcdonald's Restaurant (Central Khonkaen)",
                        opening_hours: {
                            open_now: true,
                        },
                        photos: [
                            {
                                height: 3024,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/110779849418860928121">Elia Franke</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBwjIuicXckd8Sa17HhBs3geOnZMGgbAOvDRa9GGlJRKjXSi4pQw47IkHdY0pYcdfQznJfHFLH5B9pfrZdgTvXke0QWZvokH61GxIIG0P5xBI0kFHpGapWE5dN6qKPcd6mOvUO9tvz-r62_5a2U5LBhllHI4XSV2Pfq2f2bYdD6y8iH",
                                width: 4032,
                            },
                        ],
                        place_id: "ChIJJcvbciOKIjERSuSyTqwsnXk",
                        plus_code: {
                            compound_code:
                                "CRMG+3G Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CRMG+3G",
                        },
                        price_level: 2,
                        rating: 4.2,
                        reference: "ChIJJcvbciOKIjERSuSyTqwsnXk",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "establishment",
                        ],
                        user_ratings_total: 245,
                        vicinity: "99 Sri Chant Road, Amphoe Mueang Khon Kaen",
                    },
                    {
                        business_status: "OPERATIONAL",
                        geometry: {
                            location: {
                                lat: 16.413187,
                                lng: 102.797977,
                            },
                            viewport: {
                                northeast: {
                                    lat: 16.4145131802915,
                                    lng: 102.7993620302915,
                                },
                                southwest: {
                                    lat: 16.4118152197085,
                                    lng: 102.7966640697085,
                                },
                            },
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                        icon_background_color: "#FF9E67",
                        icon_mask_base_uri:
                            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
                        name: "Fasai ฟ้าใส ใจจริง",
                        photos: [
                            {
                                height: 717,
                                html_attributions: [
                                    '<a href="https://maps.google.com/maps/contrib/110500144284269091829">Sirirat Supina</a>',
                                ],
                                photo_reference:
                                    "Aap_uEBik0Rhv2nvIEtbVTsBH6DroC_zCxF9S6xtjHZGXZ73zIkev0F2k0Bog0hWy5SQL42GbUSXR1xd4UJMooX6KuIITxnium3yfDMZbyMrkJz5LxZBsuAipG6tm85MCfggfYaiEQHzZyQWb0FlwbvZ-FcyP0oSrgchSu2-GoW8mjrcbWSm",
                                width: 960,
                            },
                        ],
                        place_id: "ChIJxXByuQViIjEROsI7xP220tQ",
                        plus_code: {
                            compound_code:
                                "CQ7X+75 Khon Kaen, Mueang Khon Kaen District, Khon Kaen, Thailand",
                            global_code: "7P84CQ7X+75",
                        },
                        rating: 4,
                        reference: "ChIJxXByuQViIjEROsI7xP220tQ",
                        scope: "GOOGLE",
                        types: [
                            "restaurant",
                            "food",
                            "point_of_interest",
                            "store",
                            "establishment",
                        ],
                        user_ratings_total: 3,
                        vicinity:
                            "90 หมู่ 15, บ้านหนองขาม ตำบลบ้านเป็ด, อำเภอเมือง",
                    },
                ],
            } as SearchResult,
            places: [],
            lat: 0,
            lng: 0,
            search_value_in_navbar_search_input: "",
        };
    },
    methods: {
        // - Check the current link for switch to another link when users enter/press some new search value.
        // I'm having a problem when searching for new values. The link has been changed. But the list of restaurants on the page doesn't change.
        switchLink(id_of_Current_search_result: string) {
            if (
                window.location.href.toString().substring(
                    0,
                    window.location.href.toString().length - 24 // - To this line of code --> window.location.href.toString().length - 24 <-- use minus 24 to delete the ObjectID in currentlink.
                    // There are 24 character in ObjectID e.g. 61b6e299dd64c45ca711d94e
                ) ===
                `http://${window.location.hostname}:${location.port}/restaurantslist/sw/`
            ) {
                this.$router.push(
                    `/restaurantslist/${id_of_Current_search_result}`
                );
            } else {
                this.$router.push(
                    `/restaurantslist/sw/${id_of_Current_search_result}`
                );
            }
        },
        changeActiveNavItem() {
            if (
                window.location.href.toString() !==
                `http://${window.location.hostname}:${location.port}/`
            ) {
                this.search_value_in_navbar_search_input = "";

                (
                    document.getElementById(
                        "make-active-nav-item"
                    ) as HTMLElement
                ).style.color = "#37e2a4";

                (
                    document.getElementById(
                        "make-active-nav-item"
                    ) as HTMLElement
                ).style.textShadow =
                    "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";

                var setInteractText = {
                    hover: function (event: any) {
                        event.target.style.color = "#37e2a4";
                        event.target.style.textShadow =
                            "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";
                    },
                    out: function (event: any) {
                        event.target.style.color = "#37e2a4";
                        event.target.style.textShadow =
                            "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";
                    },
                };

                var setInteractTextElement = document.getElementById(
                    "make-active-nav-item"
                );
                (setInteractTextElement as HTMLElement).addEventListener(
                    "mouseover",
                    setInteractText.hover,
                    false
                );
                (setInteractTextElement as HTMLElement).addEventListener(
                    "mouseout",
                    setInteractText.out,
                    false
                );
            }
        },
        searchRestaurantsSubmit(e: any) {
            e.preventDefault(); // Prevent loss search value when submit search input

            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${this.lat},${this.lng}&type=restaurant&radius=20000&key=[API KEY]`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        async getCurrentSearchResultAndRoute() {
            const res = await getSearchResults();
            this.search_results_all = res.data;

            this.search_result_current =
                this.search_results_all[this.search_results_all.length - 1];

            this.switchLink(this.search_result_current._id);
        },
        async searchResultsExistCheck(
            place_name: string,
            lat_value: number,
            lng_value: number
        ) {
            const res = await getSearchResults();
            this.search_results_all = res.data;

            let search_result_exist = false;

            if (this.search_results_all.length == 0) {
                const res = createSearchResult(this.search_result_first); //Fix bug when use seach box at first time then _id is undefined.
            }

            if (this.search_results_all.length == 2) {
                const res = createSearchResult(this.search_result_second); //Fix bug when use seach box at second time then restaurant list page load wrong data .
            }

            for (let i = 0; i < this.search_results_all.length; i++) {
                if (
                    this.search_results_all[i].search_value.toString() ===
                    place_name.toString()
                ) {
                    console.log("FIND DATA!!");

                    this.search_result_found = this.search_results_all[i];
                    search_result_exist = true;
                    break;
                }
            }

            if (search_result_exist === true) {
                this.switchLink(this.search_result_found._id);
            } else {
                (
                    document.getElementById("tiny_loader") as HTMLElement
                ).style.visibility = "visible"; // Set the small loading animation to visible when have search value that does not exist in database.

                this.searchRestaurantsAndSavingData(
                    lat_value,
                    lng_value,
                    place_name
                );
            }
        },
        searchRestaurantsAndSavingData(
            latitude: number,
            longitude: number,
            place_name: string
        ) {
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${latitude},${longitude}&type=restaurant&radius=20000&key=[API KEY]`;

            axios
                .get(URL)
                .then((response) => {
                    this.search_result.places = response.data.results;
                    this.search_result.search_value = place_name;
                    console.log("SAVING DATA");

                    const res = createSearchResult(this.search_result);
                    this.getCurrentSearchResultAndRoute();
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
    mounted() {
        const google = window.google;
        var autocomplete = new google.maps.places.Autocomplete(
            this.$refs["autocomplete"]
        );

        autocomplete.addListener("place_changed", () => {
            var place = autocomplete.getPlace();

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();

            this.searchResultsExistCheck(
                place.name,
                place.geometry.location.lat(),
                place.geometry.location.lng()
            );
        });
    },
});
</script>

<style>
#app {
    font-family: "Jost", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}

nav {
    border: #212529 0.125em solid;
}

.navbar-custom .navbar-toggler {
    margin-right: 5px;
    background-color: white;
    color: #37e2a4;
}

.navbar-custom .navbar-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

nav .navbar-nav .nav-item .nav-link {
    margin-top: 4.5px;
    margin-left: 10px;
    color: white !important;
    font-size: 16px;
}

nav .navbar-nav .nav-item .nav-link:hover {
    color: #37e2a4 !important;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

.navbar-custom .navbar-brand {
    font-size: 20px;
    color: #37e2a4;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

.navbar-custom .navbar-brand:hover {
    color: #37e2a4;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

body.searching {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2.jpg");
}

body.restaurantlist {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2-blur.jpg");
}

body.restaurantlistswitch {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2-blur.jpg");
}

.search {
    position: relative;
}

.search input {
    height: 60px;
    text-indent: 25px;
    border: 3px solid #d6d4d4;
}

#searching-form {
    margin-left: auto;
    margin-right: auto;
}

.search #navbar-search-input {
    height: 40px;
    width: 300px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
}

.search input:focus {
    box-shadow: none;
    border: 3px solid #37e2a4;
    box-shadow: inset 0 0 0.5em 0 #37e2a4, 0 0 0.5em 0 #37e2a4;
}

.search #navbar-search-input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
    box-shadow: inset 0 0 0.2em 0 #37e2a4, 0 0 0.5em 0 #37e2a4;
}

.search #fa-search {
    position: absolute;
    top: 23.5px;
    left: 16px;
    color: #212529;
}

.search #search-icon {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #212529;
}

.search button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
    color: white;
}

.search #navbar-search-button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
}
.searchbar {
    margin-bottom: auto;
    margin-top: auto;
    height: 30px;
    background-color: #353b48;
    border-radius: 30px;
    padding: 10px;
}

input,
input::-webkit-input-placeholder {
    font-size: 16px;
}

#tiny_loader {
    position: absolute;
    visibility: hidden;
    margin-left: 105px;
    width: 50px;
    height: 40px;
    stroke-dasharray: 269.7405090332031px;
    stroke-dashoffset: 0;
    animation: tiny_heartBeat 10s linear reverse infinite;
    transform: rotate(-90deg);
    filter: drop-shadow(0 0 5px #37e2a4);
}

@keyframes tiny_heartBeat {
    50% {
        stroke-dashoffset: 2200px;
    }
    50.01% {
        stroke-dashoffset: -2200px;
    }
}
</style>
