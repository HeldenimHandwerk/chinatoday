const datenschutz = () => {
  return (
    <main className="container mx-auto h-full px-4 py-6 md:px-12">
      <div className="flex flex-col justify-center text-left">
        <div className="corner-border flex items-center justify-center rounded-lg bg-gray-100 p-5 shadow">
          <h1 className="text-6xl font-bold text-red-500 md:text-9xl">
            Impressum
          </h1>
        </div>
        <div className="mt-8 rounded-lg bg-white p-5 shadow">
          <h2>Impressum</h2>
          <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          <p>
            Hartmann Public Relations GmbH
            <br />
            Gutzkowstr. 3<br />
            60594 Frankfurt
          </p>
          <p>
            Handelsregister: HRB 999999
            <br />
            Registergericht: Amtsgericht Frankfurt
          </p>
          <p>
            <strong>Vertreten durch:</strong>
            <br />
            Lukas Hartmann
          </p>
          <h2>Kontakt</h2>
          <p>
            Telefon: +49 (0) 174 2444987
            <br />
            E-Mail: info@hartmann-pr.de
          </p>
          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a
            Umsatzsteuergesetz:
            <br />
            DE999999999
          </p>
          <h2>Redaktionell verantwortlich</h2>
          <p>
            Lukas Hartmann
            <br />
            Hartmann Public Relations GmbH
            <br />
            Gutzkowstr. 3<br />
            60594 Frankfurt
          </p>
          <h2>
            Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>{' '}
        </div>
      </div>
    </main>
  )
}

export default datenschutz
