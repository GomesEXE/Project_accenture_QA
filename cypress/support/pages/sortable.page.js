class SortablePage {
  getListItems() {
    return cy.get("#demo-tabpane-list .list-group-item");
  }

  sortListAscending() {
    this.getListItems().then(($items) => {
      const currentOrder = [...$items].map((item) => item.textContent.trim());
      const ascendingOrder = [...currentOrder].sort(
        (first, second) => this.numberFor(first) - this.numberFor(second),
      );

      if (currentOrder.join("|") === ascendingOrder.join("|")) {
        this.dragListItem(0, currentOrder.length - 1);
        this.getListItems().should(($reorderedItems) => {
          const reorderedOrder = [...$reorderedItems].map((item) => item.textContent.trim());
          expect(reorderedOrder).not.to.deep.equal(currentOrder);
        });
      }

      ascendingOrder.forEach((item, targetIndex) => {
        this.getListItems().then(($currentItems) => {
          const currentIndex = [...$currentItems].findIndex(
            (currentItem) => currentItem.textContent.trim() === item,
          );
          if (currentIndex !== targetIndex) {
            this.dragListItem(currentIndex, targetIndex);
          }
        });
      });
    });
  }

  dragListItem(sourceIndex, targetIndex) {
    this.getListItems().eq(sourceIndex).then(($source) => {
      this.getListItems().eq(targetIndex).then(($target) => {
        const sourceRect = $source[0].getBoundingClientRect();
        const targetRect = $target[0].getBoundingClientRect();
        const containerRect = $source[0].parentElement.getBoundingClientRect();
        const startX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
        const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
        const endX = targetRect.left + targetRect.width / 2 - containerRect.left;
        const endY =
          (targetIndex < sourceIndex ? targetRect.top + 1 : targetRect.bottom - 1) - containerRect.top;
        const moveCount = 12;

        cy.wrap($source).realMouseDown({ position: "center" });
        for (let step = 1; step <= moveCount; step += 1) {
          const progress = step / moveCount;
          const x = startX + (endX - startX) * progress;
          const y = startY + (endY - startY) * progress;
          cy.get("#demo-tabpane-list").realMouseMove(x, y, {
            position: "topLeft",
            keepMouseDownButton: "left",
          });
        }
        cy.get("#demo-tabpane-list").realMouseUp({
          x: endX,
          y: endY,
          position: "topLeft",
        });
      });
    });
  }

  assertListAscending() {
    this.getListItems().then(($items) => {
      const actualOrder = [...$items].map((item) => item.textContent.trim());
      const expectedOrder = [...actualOrder].sort(
        (first, second) => this.numberFor(first) - this.numberFor(second),
      );
      expect(actualOrder).to.deep.equal(expectedOrder);
    });
  }

  numberFor(item) {
    const value = ["One", "Two", "Three", "Four", "Five", "Six"].indexOf(item) + 1;
    expect(value, `sortable list item "${item}"`).to.be.greaterThan(0);
    return value;
  }
}

module.exports = new SortablePage();
