/**
 * Add necessary functionalities into a view that contains a song-list component.
 */

import { assignIn } from 'lodash'
import isMobile from 'ismobilejs'

import { playback } from '@/services'
import songList from '@/components/shared/song-list.vue'
import songListControls from '@/components/shared/song-list-controls.vue'
import controlsToggler from '@/components/shared/song-list-controls-toggler.vue'
import { event } from '@/utils'

export default {
  components: { songList, songListControls, controlsToggler },

  data () {
    return {
      state: null,
      meta: {
        songCount: 0,
        totalLength: '00:00'
      },
      selectedSongs: [],
      showingControls: false,
      songListControlConfig: {},
      isPhone: isMobile.phone
    }
  },

  methods: {
    shuffleAll () {
      playback.queueAndPlay(this.state.songs, true /* shuffled */)
    },

    shuffleSelected () {
      playback.queueAndPlay(this.selectedSongs, true /* shuffled */)
    },

    toggleControls () {
      this.showingControls = !this.showingControls
    }
  },

  created () {
    event.on({
      [event.$names.UPDATE_META]: (meta, target) => target === this && assignIn(this.meta, meta),
      [event.$names.SET_SELECTED_SONGS]: (songs, target) => target === this && (this.selectedSongs = songs)
    })
  }
}
