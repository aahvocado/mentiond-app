import MentionableListModel from 'models/MentionableListModel';
import Model from 'models/Model';

const mentionableListModel = new MentionableListModel({
  category: 'movies',
});
mentionableListModel.addItem({
  label: 'In the Mood for Love',
  mentions: 2,
})
mentionableListModel.addItem({
  label: 'The Farewell',
  mentions: 3,
})
mentionableListModel.addItem({
  label: 'Once Upon a Time in Hollywood',
  mentions: 1,
})
mentionableListModel.addItem({
  label: 'YiYi',
  mentions: 0,
})
mentionableListModel.addItem({
  label: 'Toy Store 4',
  mentions: 0,
})
mentionableListModel.addItem({
  label: 'The Lion King',
  mentions: 0,
})
mentionableListModel.addItem({
  label: 'Stuber',
  mentions: 0,
})
mentionableListModel.updateIndices();

/**
 *
 */
export class AppState extends Model {
  /** @override */
  constructor(newAttributes = {}) {
    super({
      /** @type {MentionableListModel} */
      currentListModel: mentionableListModel,
      /** @type {Object} */
      ...newAttributes,
    });
  }
};
/**
 *
 */
const appState = new AppState();
export default appState;
