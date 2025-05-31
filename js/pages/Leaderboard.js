import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
        searchTerm: "", // NEW: Search term
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>
                <!-- NEW: Search bar -->
                <div class="search-bar" style="margin-bottom: 1em;">
                    <input
                        type="text"
                        v-model="searchTerm"
                        placeholder="Search player name..."
                        class="search-input"
                    />
                </div>
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in filteredLeaderboard" :key="ientry.user">
                            <td class="rank">
                                <p class="type-label-lg">#{{ getDisplayedRank(i) }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == getOriginalIndex(i) }">
                                <button @click="selected = getOriginalIndex(i)">
                                    <span class="type-label-lg">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="player-container" v-if="filteredLeaderboard.length > 0">
                    <div class="player">
                        <h1>#{{ getDisplayedRank(filteredSelectedIndex) }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{entry.progressed.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-else>
                    <p>No players found.</p>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            // Show the selected player from the filtered list if searching, else from the full list
            if (this.filteredLeaderboard.length === 0) return {};
            return this.filteredLeaderboard[this.filteredSelectedIndex];
        },
        filteredLeaderboard() {
            if (!this.searchTerm) return this.leaderboard;
            const term = this.searchTerm.toLowerCase();
            return this.leaderboard.filter(e => e.user && e.user.toLowerCase().includes(term));
        },
        filteredSelectedIndex() {
            // Map this.selected (which is the index in the original leaderboard) to the filtered list
            if (this.filteredLeaderboard.length === 0) return 0;
            const selectedUser = this.leaderboard[this.selected] && this.leaderboard[this.selected].user;
            const idx = this.filteredLeaderboard.findIndex(e => e.user === selectedUser);
            return idx !== -1 ? idx : 0;
        }
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
    },
    methods: {
        localize,
        getDisplayedRank(filteredIndex) {
            // Returns the rank as it appears in the full leaderboard
            const entry = this.filteredLeaderboard[filteredIndex];
            return this.leaderboard.findIndex(e => e.user === entry.user) + 1;
        },
        getOriginalIndex(filteredIndex) {
            // Returns the original index in the full leaderboard for selection
            const entry = this.filteredLeaderboard[filteredIndex];
            return this.leaderboard.findIndex(e => e.user === entry.user);
        }
    },
};
