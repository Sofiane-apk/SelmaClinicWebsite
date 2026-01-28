export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-medium text-gray-700">
            Clinique Dentaire Selma
          </p>
          <p>Cité Alioua Fodil, Cheraga, Alger, Algérie</p>
          <p>Tél : 0561 779 999 · 0670 635 684</p>
        </div>
        <div className="flex flex-col gap-1 text-right md:text-left">
          <p>
            Instagram :{" "}
            <a
              href="https://instagram.com/clinique.dentaire.selma"
              target="_blank"
              rel="noreferrer"
              className="text-selma-purple hover:underline"
            >
              @clinique.dentaire.selma
            </a>
          </p>
          <p>© {new Date().getFullYear()} Clinique Dentaire Selma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

