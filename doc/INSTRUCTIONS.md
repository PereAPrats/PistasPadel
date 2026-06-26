# A5 — Instruccions per a la Convocatòria Extraordinària

---

## Introducció

Alguns alumnes no han superat l'avaluació de la entrega A5 i tenen dret a una convocatòria extraordinària.
Aquesta convocatòria consisteix en un **sprint de dues setmanes** en el qual haureu de desenvolupar un **producte funcional amb interfície d'usuari**.

El professor formarà **nous equips** amb els alumnes que no han superat l'avaluació.

---

## Dates

Inici de l'_sprint_: **dilluns 22 de juny de 2026**.
Fi de l'_sprint_: **diumenge 5 de juliol de 2026** a les **23:59h**.

---

## Lliurament

L'entrega inclou el **codi** i una **memòria tècnica** en format **Markdown**.
Tant el codi com la memòria tècnica hauran d'estar dins el repositori que lliureu.

Seguiu les instruccions tal com s'indica, o correu el risc de no ser avaluats.

El repositori contindrà un fitxer README.md descrivint els continguts del repositori.

### Codi

Si teniu tot el codi a una mateixa carpeta, llavors aquesta carpeta s'anomenarà `src`.

Si decidiu separar el codi de l'interíficie d'usuari de la lògica de servei, llavors tindreu dues carpetes:
- `ui/src`
- `service/src`

Cada carpeta `src` tindrà un fitxer README.md explicant les instruccions per compilar, executar i provar el producte.

### Memòria tècnica

La memòria tècnica del projecte estarà a la carpeta `doc` del repositori i s'anomenarà REPORT.md.

### Tag

El repositori tindrà un _tag_ anomenat `entrega`.
Aquest _tag_ haurà d'haver-se creat abans de la data de fi de _sprint_.
S'avaluarà únicament el codi i la memòria de la versió etiquetada com `entrega`..

---

## Contingut de l'Informe

L'informe ha de seguir l'estructura següent:

### 1. Equip i rols

Descriviu l'equip, indicant per a cada membre:
- Nom i cognoms
- Rol o rols dins l'equip: desenvolupador _front_, desenvolupador _back_, gestor de projecte. No s'admetran més rols que aquests.
- Si un membre té múltiples rols, especifiqueu el percentatge aproximat dedicat a cada rol.

### 2. Producte

Descriviu el producte que heu decidit desenvolupar:
- Context i motivació: per què existeix aquest producte?
- Objectius generals i específics
- Tipologia (aplicació web, aplicació mòbil, videojoc, etc.)

### 3. Descomposició en user stories o casos d'ús

Presenteu la descomposició funcional del producte:
- Llista de user stories o casos d'ús, amb identificador, nom, descripció breu i criteri d'acceptació.

### 4. Requisits no funcionals

Especifiqueu els requisits no funcionals del producte:
- Rendiment, usabilitat, seguretat, disponibilitat, etc.
- Cada requisit ha de tenir un identificador únic, una descripció, i un criteri de verificació.

### 5. Disseny del producte — Model C4

Presenteu el disseny del producte utilitzant el **model C4** (Context, Containers, Components, Code) amb els tres primers nivells:

- **Nivell 1 (System Context)**: Diagrama de context que mostra el sistema i les seves interaccions amb usuaris i sistemes externs.
- **Nivell 2 (Container)**: Diagrama de contenidors que mostra les principals unitats de desplegament (aplicació web, API, base de dades, etc.) i les seves comunicacions.
- **Nivell 3 (Component)**: Diagrama de components que descomposa cada contenidor en els seus mòduls o classes principals. Heu d'identificar i descriure cada component.

Podeu incloure els diagrames com a imatges o com a diagrames de text (p. ex., Mermaid, PlantUML). Si utilitzeu imatges, assegureu-vos que siguin llegibles.

Els diagrames han d'indicar les tecnologies principals utilitzades per a cada contenidor i per la comunicació entre els diferents contenidors.

### 6. Resultats i conclusions

Aquest capítol ha d'incloure:

- **Producte desenvolupat**: Què s'ha construït? Quines funcionalitats estan operatives? Quin estat de maduresa té el producte?
- **Contribució per desenvolupador a cada mòdul**: Per a cada component descrit al nivell 3 del model C4, indiqueu quina ha estat la contribució de cada membre de l'equip (en hores dedicades).
- **Contribució a la gestió del backlog**: Indiqueu quina ha estat la contribució (en hores) de cada membre a la gestió del projecte (priorització, descomposició de tasques, seguiment, etc.).
- **Lliçons apreses**: Què ha funcionat bé? Què es podria millorar?

## Avaluació

L'avaluació tindrà en compte:

- **Anàlisi del producte**: El producte està ben descrit i especificat?
- **Disseny del producte**: Està clar com es construirà el producte? El disseny és adequat per al producte que es desenvoluparà?
- **Abast del producte**: Està clar què s'ha construït i què no? S'ha justificat la priorització de funcionalitats? S'ha construït una quantitat significativa del que es pretenia construir?
- **L'equip**: Està clar quant ha contribuït cada membre a cada mòdul? Està clar qui ha contribuït a la gestió del projecte?

## Recomanacions

- El producte ha de ser **funcional** i tenir una **interfície d'usuari**. No es valoraran productes que només siguin una API o un script de terminal.
- Hi ha poc temps, així que prioritzeu aquelles funcionalitats que donaran un major valor al producte.
- Heu d'indicar les hores dedicades per cada membre a cada mòdul i la gestió, així que enregistreu des del primer moment les hores dedicades.
- Prioritzeu la qualitat del codi i una arquitectura ben definida per sobre de la quantitat de funcionalitats.
- Utilitzeu eines de gestió de projectes (Trello, Jira, GitHub Projects, etc.) per gestionar el backlog. El professor us podrà demanar evidències de l'ús d'aquestes eines.
- Feu commits freqüents al repositori amb missatges descriptius.
- Incloeu captures de pantalla o evidències visuals del producte final.
- Durant l'avaluació, el professor podrà citar als membres per tal de que justifiquin decisions que han près, o que raonin com implementarien alguns canvis proposats.
