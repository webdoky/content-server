import test from 'ava';
import registry from './index';
import { runMacros } from './macros-runner';

const mdContent = `**JavaScript** (**JS**) &mdash; це невибаглива до ресурсів мова програмування з {{Glossary("First-class Function", "функціями першого класу")}}, код якої інтерпретується, або компілюється ["на льоту"](https://uk.wikipedia.org/wiki/JIT-%D0%BA%D0%BE%D0%BC%D0%BF%D1%96%D0%BB%D1%8F%D1%86%D1%96%D1%8F). Хоча JavaScript насамперед відома як скриптова мова для вебсторінок, вона також використовується у [багатьох не браузерних середовищах](https://uk.wikipedia.org/wiki/JavaScript#%D0%97%D0%B0%D1%81%D1%82%D0%BE%D1%81%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F), як от: {{Glossary("Node.js")}}, [Apache CouchDB](https://couchdb.apache.org/) та [Adobe Acrobat](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/). JavaScript — це {{Glossary("Prototype-based programming", "прототипна")}}, однопотокова динамічна мова, що має декілька парадигм та підтримує об'єктноорієнтований, та декларативні (зокрема функційне програмування) стилі. Більше [про JavaScript](/uk/docs/Web/JavaScript/About_JavaScript).

> **Callout:** **Хочете стати фронтенд розробником?**
>
> Ми зібрали докупи курс, що містить всю необхідну інформацію, яка знадобиться вам
> для роботи над досягненням цієї мети
>
> [**Почати**](/uk/docs/Learn/Front-end_web_developer)

## Посібники

Вчіться програмувати на JavaScript за допомогою наших настанов та посібників.

### Для абсолютних початківців

Зверніться до [тематики "JavaScript" у нашому навчальному розділі](/uk/docs/Learn/JavaScript), якщо ви маєте бажання вчити JavaScript, але не маєте попереднього досвіду роботи з JavaScript чи програмування загалом. Повний список модулів, доступних там, виглядає так:`;

const parsedMdToHtmlSample = `<p><strong>JavaScript</strong> (<strong>JS</strong>) — це невибаглива до ресурсів мова програмування з {{Glossary("First-class Function", "функціями першого класу")}}, код якої інтерпретується, або компілюється <a href="https://uk.wikipedia.org/wiki/JIT-%D0%BA%D0%BE%D0%BC%D0%BF%D1%96%D0%BB%D1%8F%D1%86%D1%96%D1%8F" target="_blank" rel="noopener,noreferrer">"на льоту"</a>. Хоча JavaScript насамперед відома як скриптова мова для вебсторінок, вона також використовується у <a href="https://uk.wikipedia.org/wiki/JavaScript#%D0%97%D0%B0%D1%81%D1%82%D0%BE%D1%81%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F" target="_blank" rel="noopener,noreferrer">багатьох не браузерних середовищах</a>, як от: {{Glossary("Node.js")}}, <a href="https://couchdb.apache.org/" target="_blank" rel="noopener,noreferrer">Apache CouchDB</a> та <a href="https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/" target="_blank" rel="noopener,noreferrer">Adobe Acrobat</a>. JavaScript — це {{Glossary("Prototype-based programming", "прототипна")}}, однопотокова динамічна мова, що має декілька парадигм та підтримує об'єктноорієнтований, та декларативні (зокрема функційне програмування) стилі. Більше <a href="/uk/docs/Web/JavaScript/About_JavaScript">про JavaScript</a>.</p>
<blockquote>
<p><strong>Callout:</strong> <strong>Хочете стати фронтенд розробником?</strong></p>
<p>Ми зібрали докупи курс, що містить всю необхідну інформацію, яка знадобиться вам
для роботи над досягненням цієї мети</p>
<p><a href="/uk/docs/Learn/Front-end_web_developer"><strong>Почати</strong></a></p>
</blockquote>
<h2 id="posibnyky"><a aria-hidden="true" tabindex="-1" href="#posibnyky"><span class="icon icon-link"></span></a>Посібники</h2>
<p>Вчіться програмувати на JavaScript за допомогою наших настанов та посібників.</p>
<h3 id="dlia-absoliutnykh-pochatkivtsiv"><a aria-hidden="true" tabindex="-1" href="#dlia-absoliutnykh-pochatkivtsiv"><span class="icon icon-link"></span></a>Для абсолютних початківців</h3>
<p>Зверніться до <a href="/uk/docs/Learn/JavaScript">тематики "JavaScript" у нашому навчальному розділі</a>, якщо ви маєте бажання вчити JavaScript, але не маєте попереднього досвіду роботи з JavaScript чи програмування загалом. Повний список модулів, доступних там, виглядає так:</p>`;

const parsedMdToHtmlDescriptionSample =
  'JavaScript (JS) — це невибаглива до ресурсів мова програмування з {{Glossary("First-class Function", "функціями першого класу")}}, код якої інтерпретується, або компілюється "на льоту". Хоча JavaScript насамперед відома як скриптова мова для вебсторінок, вона також використовується у багатьох не браузерних середовищах, як от: {{Glossary("Node.js")}}, Apache CouchDB та Adobe Acrobat. JavaScript — це {{Glossary("Prototype-based programming", "прототипна")}}, однопотокова динамічна мова, що має декілька парадигм та підтримує об\'єктноорієнтований, та декларативні (зокрема функційне програмування) стилі. Більше про JavaScript.';

const headersSample = [
  {
    anchor: '#posibnyky',
    depth: 2,
    value: 'Посібники',
  },
  {
    anchor: '#dlia-absoliutnykh-pochatkivtsiv',
    depth: 3,
    value: 'Для абсолютних початківців',
  },
];

const mixedMdHtmlContent = `**JavaScript** (**JS**) &mdash; це невибаглива до ресурсів мова програмування з <a href="/uk/docs/Glossary/First-class_Function">функціями першого класу</a>, код якої інтерпретується, або компілюється ["на льоту"](https://uk.wikipedia.org/wiki/JIT-%D0%BA%D0%BE%D0%BC%D0%BF%D1%96%D0%BB%D1%8F%D1%86%D1%96%D1%8F). Хоча JavaScript насамперед відома як скриптова мова для вебсторінок, вона також використовується у [багатьох не браузерних середовищах](https://uk.wikipedia.org/wiki/JavaScript#%D0%97%D0%B0%D1%81%D1%82%D0%BE%D1%81%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F), як от: <a href="/uk/docs/Glossary/Node.js">Node.js</a>, [Apache CouchDB](https://couchdb.apache.org/) та [Adobe Acrobat](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/). JavaScript — це <a href="/uk/docs/Glossary/Prototype-based_programming">прототипна</a>, однопотокова динамічна мова, що має декілька парадигм та підтримує об'єктноорієнтований, та декларативні (зокрема функційне програмування) стилі. Більше [про JavaScript](/uk/docs/Web/JavaScript/About_JavaScript).

Цей розділ присвячено саме мові JavaScript, і він не стосується тонкощів роботи з вебсторінками, чи іншими середовищами для виконання JavaScript. Інформацію стосовно конкретних <a href="/uk/docs/Glossary/API">API</a> вебсторінок дивіться у [веб API](/uk/docs/Web/API) та <a href="/uk/docs/Glossary/DOM">DOM</a>.`;

const mixedContentInHtml = `<p><strong>JavaScript</strong> (<strong>JS</strong>) — це невибаглива до ресурсів мова програмування з <a href="/uk/docs/Glossary/First-class_Function">функціями першого класу</a>, код якої інтерпретується, або компілюється <a href="https://uk.wikipedia.org/wiki/JIT-%D0%BA%D0%BE%D0%BC%D0%BF%D1%96%D0%BB%D1%8F%D1%86%D1%96%D1%8F" target="_blank" rel="noopener,noreferrer">"на льоту"</a>. Хоча JavaScript насамперед відома як скриптова мова для вебсторінок, вона також використовується у <a href="https://uk.wikipedia.org/wiki/JavaScript#%D0%97%D0%B0%D1%81%D1%82%D0%BE%D1%81%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F" target="_blank" rel="noopener,noreferrer">багатьох не браузерних середовищах</a>, як от: <a href="/uk/docs/Glossary/Node.js">Node.js</a>, <a href="https://couchdb.apache.org/" target="_blank" rel="noopener,noreferrer">Apache CouchDB</a> та <a href="https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/" target="_blank" rel="noopener,noreferrer">Adobe Acrobat</a>. JavaScript — це <a href="/uk/docs/Glossary/Prototype-based_programming">прототипна</a>, однопотокова динамічна мова, що має декілька парадигм та підтримує об'єктноорієнтований, та декларативні (зокрема функційне програмування) стилі. Більше <a href="/uk/docs/Web/JavaScript/About_JavaScript">про JavaScript</a>.</p>
<p>Цей розділ присвячено саме мові JavaScript, і він не стосується тонкощів роботи з вебсторінками, чи іншими середовищами для виконання JavaScript. Інформацію стосовно конкретних <a href="/uk/docs/Glossary/API">API</a> вебсторінок дивіться у <a href="/uk/docs/Web/API">веб API</a> та <a href="/uk/docs/Glossary/DOM">DOM</a>.</p>`;

test('mdProcessor should parse markdown properly', async (t) => {
  const processedContent = await registry.processMdPage(mdContent);

  t.assert(
    t.deepEqual(parsedMdToHtmlSample, processedContent.content),
    'Content should match parsed sample',
  );
  t.assert(
    t.deepEqual(headersSample, processedContent.headings),
    'Headings should be contain first section',
  );

  t.assert(
    t.deepEqual(parsedMdToHtmlDescriptionSample, processedContent.description),
    'Content should match the text',
  );

  const { content: processedMixedContent } = await registry.processMdPage(
    mixedMdHtmlContent,
  );

  t.assert(
    t.deepEqual(mixedContentInHtml, processedMixedContent),
    'Processed markdown should retain existing HTML tags',
  );
});

const sourceMd = `## Специфікації

{{Specifications}}`;

// const processedMdSample = `<h2 id="spetsyfikatsii"><a aria-hidden="true" tabindex="-1" href="#spetsyfikatsii"><span class="icon icon-link"></span></a>Специфікації</h2>
// <table className="table--standard">
// `;

const processedMdSample = `<h2 id="spetsyfikatsii"><a aria-hidden="true" tabindex="-1" href="#spetsyfikatsii"><span class="icon icon-link"></span></a>Специфікації</h2>
<table className="table--standard">
          <thead>
            <tr>
              <th scope="col">Специфікація</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                <a href="https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-string.prototype.blink">
                  ECMAScript Language Specification
                  (ECMAScript)
                  <br />
                  <small>
                      # sec-string.prototype.blink
                    </small>
                </a>
              </td>
            </tr>
          </tbody>
        </table>`;

test('mdProcessor should run two subsequent transformations', async (t) => {
  const { content: expandedMacros } = runMacros(sourceMd, {
    targetLocale: 'uk',
    registry: {},
    path: 'testPath',
    slug: 'testSlug',
    browserCompat: 'javascript.builtins.String.blink',
  });

  const { content: processedContent } = await registry.processMdPage(
    expandedMacros,
  );

  t.assert(
    t.deepEqual(processedMdSample, processedContent),
    'Content should match parsed sample',
  );
});
