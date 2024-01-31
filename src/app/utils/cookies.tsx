'use client'

import React from 'react'
import { CookifyConsent } from 'react-cookify'

export default function Cookies({ children }: { children: React.ReactNode }) {
  return (
    <CookifyConsent
      settings={{
        options: {
          name: 'cookie-consent',
          store: 'storage',
          saveByDefault: false,
          saveWithChange: false,
          types: {
            necessary: true,
            marketing: false, // For Mailchimp
            statistics: false, // For Google Analytics
            performance: false
          },
          jscookie: {
            expires: 365,
            path: '/',
            secure: true
          },
          revision: 1
        },
        consent: {
          theme: 'custom',
          support: false,

          paused: {
            title: 'Hinweis zum Einwilligungsmanager',
            desc: 'Der Einwilligungsmanager ist auf dieser Seite pausiert, um die Datenschutzrichtlinie zu lesen.',
            icon: 'ℹ️',
            url: '/datenschutz'
          },
          info: {
            title: 'Wir verwenden Cookies!',
            desc: (
              <>
                Willkommen! Um Ihr Erlebnis zu verbessern, verwenden wir Cookies
                und halten uns an die DSGVO. Weitere Informationen finden Sie in
                unserer{' '}
                <a
                  href="/datenschutz"
                  style={{ textDecoration: 'underline', fontWeight: 500 }}
                >
                  Datenschutzrichtlinie{' '}
                </a>
                .
              </>
            ),
            buttons: [
              {
                action: 'manage',
                label: 'Einstellungen verwalten',
                schema: 'week'
              },
              {
                action: 'all',
                label: 'Alle Cookies akzeptieren',
                schema: 'strong'
              }
            ]
          },
          detail: {
            title: 'Verwalten Sie Ihre Einwilligungseinstellungen',
            desc: (
              <>
                Wir möchten, dass Ihr Besuch auf unserer Website großartig ist,
                daher verwenden wir Cookies, um Ihnen die beste Erfahrung zu
                bieten und Präferenzen zu speichern. Sie können Ihre
                Cookie-Einstellungen jederzeit verwalten. Um mehr über unseren
                Einsatz von Cookies zu erfahren, schauen Sie sich gerne unsere{' '}
                <a
                  href="/datenschutz"
                  style={{ textDecoration: 'underline', fontWeight: 500 }}
                >
                  Datenschutzrichtlinie
                </a>
                .
              </>
            ),
            reference: {
              desc: 'Bitte geben Sie die untenstehenden Informationen an, wenn Sie eine Anfrage bezüglich Cookies einreichen.',
              uuid: 'UUID',
              accepted: 'Akzeptiert',
              updated: 'Aktualisiert'
            },
            buttons: [
              {
                action: 'necessary',
                label: 'Nur notwendige',
                schema: 'week'
              },
              {
                action: 'accept',
                label: 'Ausgewählte akzeptieren',
                schema: 'week'
              },
              {
                action: 'all',
                label: 'Alle akzeptieren',
                schema: 'strong'
              }
            ]
          },
          table: {
            headers: ['Name', 'Domain', 'Ablauf', 'Beschreibung'],
            types: [
              {
                for: 'necessary',
                title: 'Unbedingt notwendig',
                desc: 'Diese Cookies sind wesentlich für das Funktionieren der Website und können nicht in unseren Systemen abgeschaltet werden.'
              },
              {
                for: 'statistics',
                title: 'Statistiken',
                desc: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie Informationen anonym sammeln und melden, wie bei Google Analytics.'
              },
              {
                for: 'performance',
                title: 'Leistung',
                desc: 'Diese Cookies helfen uns, die Leistung und Benutzererfahrung unserer Website zu verbessern.'
              }
            ]
          }
        }
      }}
    >
      {children}
    </CookifyConsent>
  )
}
