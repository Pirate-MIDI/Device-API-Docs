/* Convert JSON code blocks into interactive renderjson tree viewers */
(function () {
  renderjson.set_show_to_level(1);
  renderjson.set_icons("\u25b6", "\u25bc");
  renderjson.set_sort_objects(false);

  function initJsonViewer() {
    // pymdownx.superfences renders code blocks as:
    //   <div class="highlight"><pre><span></span><code>...</code></pre></div>
    // We target all code blocks inside .highlight and rely on JSON.parse
    // to filter only valid JSON content.
    document.querySelectorAll("div.highlight > pre > code").forEach(function (codeEl) {
      var preEl = codeEl.closest("pre");
      if (!preEl || preEl.classList.contains("json-viewer-processed")) return;
      preEl.classList.add("json-viewer-processed");

      var jsonText = codeEl.textContent;
      try {
        var jsonObj = JSON.parse(jsonText);
      } catch (e) {
        return; // not valid JSON, leave as-is
      }

      // Container
      var container = document.createElement("div");
      container.className = "json-viewer";

      // Copy button
      var copyBtn = document.createElement("button");
      copyBtn.className = "json-viewer-copy";
      copyBtn.title = "Copy JSON to clipboard";
      copyBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">' +
        '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 ' +
        '.9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(jsonText).then(function () {
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ' +
            'width="16" height="16"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 ' +
            '1.41L9 19 21 7l-1.41-1.41z"/></svg>';
          setTimeout(function () {
            copyBtn.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" ' +
              'height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 ' +
              '4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 ' +
              '16H8V7h11v14z"/></svg>';
          }, 2000);
        });
      });

      // Render tree
      var rendered = renderjson(jsonObj);

      container.appendChild(copyBtn);
      container.appendChild(rendered);

      // Replace original code block (or its .highlight wrapper)
      var target = preEl.parentElement && preEl.parentElement.classList.contains("highlight")
        ? preEl.parentElement : preEl;
      target.parentNode.replaceChild(container, target);
    });
  }

  // MkDocs Material instant navigation support
  document$.subscribe(initJsonViewer);
})();
