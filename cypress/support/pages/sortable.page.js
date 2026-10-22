class SortablePage {
  getGridItems() {
    return cy.get("#demo-tabpane-grid .list-group-item");
  }

  getListItems() {
    return cy.get("#demo-tabpane-list .list-group-item");
  }

  sortListAscending() {
    this.sortItemsAscending(() => this.getListItems(), false);
  }

  sortGridAscending() {
    cy.get("#demo-tab-grid").click();
    this.sortItemsAscending(() => this.getGridItems(), true);
  }

  sortItemsAscending(getItems, isGrid) {
    const items = getItems();
    items.then(($items) => {
      const currentOrder = [...$items].map((item) => item.textContent.trim());
      const ascendingOrder = [...currentOrder].sort(
        (first, second) => this.numberFor(first) - this.numberFor(second),
      );

      if (currentOrder.join("|") === ascendingOrder.join("|")) {
        this.dragItem(getItems, 0, currentOrder.length - 1, isGrid);
        getItems().should(($reorderedItems) => {
          const reorderedOrder = [...$reorderedItems].map((item) => item.textContent.trim());
          expect(reorderedOrder).not.to.deep.equal(currentOrder);
        });
      }

      ascendingOrder.forEach((item, targetIndex) => {
        getItems().then(($currentItems) => {
          const currentIndex = [...$currentItems].findIndex(
            (currentItem) => currentItem.textContent.trim() === item,
          );
          if (currentIndex !== targetIndex) {
            this.dragItem(getItems, currentIndex, targetIndex, isGrid);
          }
        });
      });
    });
  }

  dragItem(getItems, sourceIndex, targetIndex, isGrid) {
    getItems().eq(sourceIndex).then(($source) => {
      getItems().eq(targetIndex).then(($target) => {
        const panelSelector = isGrid ? "#demo-tabpane-grid" : "#demo-tabpane-list";
        cy.get(panelSelector).then(($panel) => {
          const sourceRect = $source[0].getBoundingClientRect();
          const targetRect = $target[0].getBoundingClientRect();
          const containerRect = $panel[0].getBoundingClientRect();
          const startX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
          const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
          const endX = isGrid
            ? (targetIndex < sourceIndex ? targetRect.left + 1 : targetRect.right - 1) -
              containerRect.left
            : targetRect.left + targetRect.width / 2 - containerRect.left;
          const endY = isGrid
            ? targetRect.top + targetRect.height / 2 - containerRect.top
            : (targetIndex < sourceIndex ? targetRect.top + 1 : targetRect.bottom - 1) -
              containerRect.top;
          const moveCount = 12;

          cy.wrap($source).realMouseDown({ position: "center" });
          for (let step = 1; step <= moveCount; step += 1) {
            const progress = step / moveCount;
            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;
            cy.get(panelSelector).realMouseMove(x, y, {
              position: "topLeft",
              keepMouseDownButton: "left",
            });
          }
          cy.get(panelSelector).realMouseUp({
            x: endX,
            y: endY,
            position: "topLeft",
          });
        });
      });
    });
  }

  assertListAscending() {
    this.assertItemsAscending(this.getListItems());
  }

  assertGridAscending() {
    this.getGridItems().then(($items) => {
      expect($items).to.have.length(9);
    });
    this.assertItemsAscending(this.getGridItems());
  }

  assertItemsAscending(items) {
    items.then(($items) => {
      const actualOrder = [...$items].map((item) => item.textContent.trim());
      const expectedOrder = [...actualOrder].sort(
        (first, second) => this.numberFor(first) - this.numberFor(second),
      );
      expect(actualOrder).to.deep.equal(expectedOrder);
    });
  }

  numberFor(item) {
    const value =
      ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"].indexOf(item) + 1;
    expect(value, `sortable list item "${item}"`).to.be.greaterThan(0);
    return value;
  }
}

module.exports = new SortablePage();
