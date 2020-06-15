<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      v-model="content"
      placeholder="GO ahead write something …"
      :extensions="extensions"
      :toolbar-attributes="{ color: 'black', dark: true }"
    ></tiptap-vuetify>
  </div>
</template>

<script>
import { bus } from "../main";
// or your own extension
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
  TodoList,
  TodoItem,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from "tiptap-vuetify";
// or your own extension
export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    name: "EditorFile",
    extensions: [
      History,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      Image,
      [
        Heading,
        {
          // Options that fall into the tiptap's extension
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      TodoList,
      [
        TodoItem,
        {
          options: {
            nested: true
          }
        }
      ],
      Paragraph,
      HardBreak, // line break on Shift + Ctrl + Enter,
      [
        Link,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        Underline,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        Strike,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        Bold,
        {
          renderIn: "bubbleMenu",
          // extension's options
          options: {
            levels: [1, 2, 3]
          }
        }
      ]
    ],

    // starting editor's content
    content: ` <h1>Most basic use</h1>
      <p>
        You can use the necessary extensions.
        The corresponding buttons are
        <strong>
          added automatically.
        </strong>
      </p>  
    `
  }),
  computed: {},
  methods: {
    // onkeydown() {
    //   console.log(this.content);
    // }
  },
  created: function() {
    this.$socket.emit("join", this.$route.query.documentID),
      bus.$on("updateContent", data => {
        data = this.content;
        bus.$emit("Content", data);
      });
    console.log(this.$route.query.documentID);
    // window.addEventListener("keydown", this.onkeydown);
  }, //This is done to attach the listener before the render

  mounted: function() {
    this.$socket.on("update", data => {
      this.content = data;
    });
  },
  watch: {
    content: function(value) {
      this.$socket.emit("send", value);
    }
  }
};
</script>