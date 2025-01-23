<template>
  <ion-menu
    content-id="main-content"
    type="push"
  >
    <ion-content>
      <ion-list id="inbox-list">
        <ion-list-header>
          <ion-text color="secondary">GRAB</ion-text><br />
          <ion-text color="tertiary">YOUR</ion-text><br />
          <ion-text color="primary">KEY</ion-text>
        </ion-list-header>

        <ion-note>
          <p>
            Are you a bass player?<br />Grab Your Key is a simple tool inspired by Scott Devine's awesome post
            <a href="https://scottsbasslessons.com/blog/practice-this-every-day">Practice THIS Every Day</a>.
          </p>
          <p>
            To get started, choose a key in the circle of fifths and play the scale in a vertical and horizontal way.
            Next, play the scale harmonized in triads. Then play along with a random chord progression: Turn on a
            <a href="https://groovetrainer.scottsbasslessons.com">rhythm machine</a> and start jamming. Create simple
            bass lines by first using just root notes, and then try adding the octave, 3rd and 5th of the chords.
          </p>
        </ion-note>

        <ion-item
          href="https://github.com/mettbox/grab-your-key"
          lines="none"
          :detail="false"
          class="hydrated"
        >
          <ion-icon
            aria-hidden="true"
            slot="start"
            :icon="logoGithub"
          ></ion-icon>
          <ion-label>Maik Mettenheimer<br />maik@mettbox.de</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonNote, IonText } from '@ionic/vue';
import { logoGithub } from 'ionicons/icons';
</script>

<style scoped>
ion-menu {
  ion-content {
    --background: var(--ion-item-background);
  }

  ion-note {
    display: inline-block;
    font-size: 16px;

    a {
      color: var(--ion-color-secondary);
      text-decoration: none;
      border-bottom: 1px solid var(--ion-color-primary);
    }

    b {
      color: var(--ion-color-secondary);
      font-weight: bold;
    }
  }
}

ion-menu.ios {
  ion-content {
    --padding-bottom: 20px;
  }

  ion-list {
    padding: 20px 0 0 0;
  }

  ion-note {
    line-height: 1.8;
    margin-top: 20px;
    color: var(--ion-text-color);
  }

  ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 50px;
  }

  ion-item ion-icon {
    font-size: 24px;
  }

  ion-list-header,
  ion-note {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
