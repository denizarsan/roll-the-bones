<template>
  <div>
    <v-btn icon @click="open()" v-if="!line.isReady && !isConnecting">
      <v-icon>person</v-icon>
    </v-btn>
    <v-progress-circular v-if="isConnecting && !line.isReady" indeterminate color="accent" :size="24"></v-progress-circular>
    <v-layout v-if="line.isReady" align-center>
      <div class="hidden-xs-only">
        {{ line.user.username }} #{{ line.user.discriminator }} | {{ line.server.name }} | {{ line.channel.name }}
      </div>
      <v-btn icon @click="disconnect()">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-layout>
    <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="secondary">
          <v-btn icon @click="cancel()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Connect</v-toolbar-title>
        </v-toolbar>
        <v-stepper v-model="step" vertical>
          <v-stepper-step step="1" :complete="step > 1">
            Enter Bot Token and Server ID
          </v-stepper-step>
          <v-stepper-content step="1">
            <div>
              <p>
                Ask your server admin to create and add a new Discord bot to the server
                you'll be using and share token for this bot with you.
                To create a bot, your admin should:
              </p>

              <div class="instructions mb-3">
                <div class="instruction mb-2">
                  <span class="instruction-number primary white--text mr-2">1</span>
                  <span class="instruction-text">
                    Create a new Discord app through
                    <a class="instruction-link" href="https://discordapp.com/developers/applications/me" target="_blank">
                      this link
                    </a>
                  </span>
                </div>
                <div class="instruction mb-2">
                  <span class="instruction-number primary white--text mr-2">2</span>
                  <span class="instruction-text">
                    Create a bot user for this app
                  </span>
                </div>
                <div class="instruction mb-2">
                  <span class="instruction-number primary white--text mr-2">3</span>
                  <span class="instruction-text">
                    Generate a OAuth2 URL with the "Send Messages" permission
                  </span>
                </div>
                <div class="instruction mb-2">
                  <span class="instruction-number primary white--text mr-2">4</span>
                  <span class="instruction-text">
                    Go to this URL and add the bot your server
                  </span>
                </div>
                <div class="instruction mb-2">
                  <span class="instruction-number primary white--text mr-2">5</span>
                  <span class="instruction-text">
                    Share the bot token on the created application page with you
                  </span>
                </div>
              </div>

              <p>
                You also need to the ID for your Discord server. You can follow the instructions
                <a class="instruction-link" href="https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-" target="_blank">
                  here
                </a>
              </p>
            </div>
            <v-layout>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Token" v-model="token"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Server ID" v-model="id"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-btn :disabled="line.isOnline" :loading="isConnecting" color="primary" @click="connect()">Connect</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="2" :complete="step > 2">
            Select User and Channel
          </v-stepper-step>
          <v-stepper-content step="2">
            <p>
              Select the channel you want your rolls to appear and yourself as the user.<br>
              You'll need to introduce yourself to the bot in the next step using your Discord account, so don't try to be smart by choosing a different user.
              <v-tooltip bottom>
                <v-icon small dark color="primary" slot="activator">help_outline</v-icon>
                <span>Yes Caner, I'm talking to you.</span>
              </v-tooltip>
            </p>
            <v-layout>
              <v-flex xs12 sm6 md4>
                <v-select :items="channels" item-text="name" v-model="channel" label="Channel"></v-select>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12 sm6 md4>
                <v-select :items="users" item-text="username" v-model="user" label="User"></v-select>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-btn color="secondary" @click="disconnect()">Back</v-btn>
              <v-btn color="primary" :disabled="!channel || !user" @click="generate()">Next</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="3" :complete="step > 3">Introduce Yourself</v-stepper-step>
          <v-stepper-content step="3">
            <v-layout column align-center v-if="line.isOnline && user">
              <v-flex xs12 class="text-xs-center mb-3">
                <div class="headline">Hey {{ user.username }}!</div>
                <div class="subheading">
                Send the pin you see below to
                <strong>{{ channel.name }}</strong> channel in <strong>{{ line.server.name }}</strong> server</div>
              </v-flex>
              <v-flex xs12 class="mb-3">
                <v-progress-circular :size="50" :value="pinTimer">
                  {{ Math.ceil(pinPeriod / 1000 * pinTimer / 100) }}
                </v-progress-circular>
              </v-flex>
              <v-flex xs12 class="mb-3">
                <div class="title">{{ pin }}</div>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-step step="4">Done!</v-stepper-step>
          <v-stepper-content step="4">
            <v-layout column align-center>
              <div class="headline mb-3">You are all set!</div>
              <v-icon class="mb-3" size="60px" color="success">check</v-icon>
              <div class="subheading mb-3">Now you are ready to send your rolls automatically to Discord</div>
              <v-btn color="primary" @click="close()">Done</v-btn>
            </v-layout>
          </v-stepper-content>

        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AUTH_PERIOD, AUTH_DELAY } from '@/utils/constants';
import Line from '@/classes/Line';

export default {
  name: 'Auth',
  computed: {
    ...mapState({
      line: state => state.line,
    }),
  },
  data() {
    return {
      isOpen: false,
      isConnecting: false,
      token: '',
      id: '',
      channels: [],
      users: [],
      channel: null,
      user: null,
      step: 0,
      pin: '',
      pinInterval: {},
      pinTimer: 100,
      pinDelay: AUTH_DELAY,
      pinPeriod: AUTH_PERIOD,
    };
  },
  created() {
    const data = JSON.parse(localStorage.getItem('auth'));
    if (data) {
      this.isConnecting = true;
      this.token = data.token;
      this.id = data.id;
      this.line.connect(data.token, data.id).then(() => {
        this.isConnecting = false;
        this.line.channel = data.channel;
        this.line.user = data.user;
      });
    }
  },
  methods: {
    ...mapMutations(['updateLine']),
    open() {
      this.isOpen = true;
    },
    cancel() {
      this.isOpen = false;
      this.disconnect();
    },
    close() {
      this.isOpen = false;
    },
    goTo(step) {
      this.step = step;
    },
    connect() {
      this.isConnecting = true;
      this.line.connect(this.token, this.id).then(() => {
        this.channels = this.line.channels;
        this.users = this.line.users;
        this.updateLine({ line: this.line });
        this.isConnecting = false;
        this.goTo(2);
      });
    },
    disconnect() {
      clearInterval(this.pinInterval);
      this.pinTimer = 100;
      this.line.disconnect();
      this.updateLine({ line: new Line() });
      this.channels = [];
      this.users = [];
      this.channel = null;
      this.user = null;
      this.step = 1;
      localStorage.removeItem('auth');
    },
    generate() {
      this.line.channel = this.channel;
      this.step = 3;
      this.pin = Math.random().toString().substr(2, 4);
      this.pinInterval = setInterval(() => {
        this.pinTimer = this.pinTimer - ((this.pinDelay / this.pinPeriod) * 100);
        if (this.pinTimer < 0) {
          this.pinTimer = 100;
          this.pin = Math.random().toString().substr(2, 4);
        }
      }, this.pinDelay);

      const handler = (message) => {
        if (message.channel.id === this.line.channel.id &&
          message.author.id === this.user.id &&
          message.content === this.pin) {
          message.reply('Nice to meet you!');
          this.line.user = this.user;
          this.line.bot.removeAllListeners('message');
          this.updateLine({ line: this.line });
          this.step = 4;
          clearInterval(this.pinInterval);

          const data = {
            token: this.token,
            id: this.id,
            user: this.line.user,
            channel: this.line.channel,
          };
          localStorage.setItem('auth', JSON.stringify(data));
        }
      };
      this.line.bot.removeAllListeners('message');
      this.line.bot.on('message', handler);
    },
  },
};
</script>

<style scoped>
.instruction-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 100%;
}

.instruction-link {
  text-decoration: none;
}
</style>
