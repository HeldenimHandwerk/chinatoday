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
          theme: 'dark',
          support: false,

          paused: {
            title: 'Consent Manger Notice',
            desc: 'The consent manager is paused on this side to read the privacy policy.',
            icon: 'ℹ️',
            url: '/privacy'
          },
          info: {
            title: 'We use cookies!',
            desc: (
              <>
                Welcome! To enhance your experience, we use cookies and comply
                with GDPR. For more information feel free to check out our{' '}
                <a
                  href="#"
                  style={{ textDecoration: 'underline', fontWeight: 500 }}
                >
                  privacy policy
                </a>
                .
              </>
            ),
            buttons: [
              {
                action: 'manage',
                label: 'Manage settings',
                schema: 'week'
              },
              {
                action: 'all',
                label: 'Accept all cookies',
                schema: 'strong'
              }
            ]
          },
          detail: {
            title: 'Manage your consent settings',
            desc: (
              <>
                We want your visit to our website to be awesome, so we use
                cookies to give you the best expirience and for remembering
                preferences. You can manage your cookie preferences at any time.
                To learn more about our use of cookies feel free to check out
                our{' '}
                <a
                  href="#"
                  style={{ textDecoration: 'underline', fontWeight: 500 }}
                >
                  privacy policy
                </a>
                .
              </>
            ),
            reference: {
              desc: 'Please provide the below information when you hand in a request about cookies.',
              uuid: 'UUID',
              accepted: 'Accepted',
              updated: 'Updated'
            },
            buttons: [
              {
                action: 'necessary',
                label: 'Only necessary',
                schema: 'week'
              },
              {
                action: 'accept',
                label: 'Accept selected',
                schema: 'week'
              },
              {
                action: 'all',
                label: 'Accept all',
                schema: 'strong'
              }
            ]
          },
          table: {
            headers: ['Name', 'Domain', 'Expiration', 'Description'],
            types: [
              {
                for: 'necessary',
                title: 'Strict Necessary',
                desc: 'These cookies are essential for the website to function and cannot be switched off in our systems.'
              },
              {
                for: 'statistics',
                title: 'Statistics',
                desc: 'These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously, like in Google Analytics.'
              },
              {
                for: 'performance',
                title: 'Performance',
                desc: 'These cookies help us improve the performance and user experience of our website.'
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
