<template>
	<v-col cols="12">
		<wikititle :loading="loading" :title="'编辑中: ' + title" />

		<v-skeleton-loader v-if="loading" type="image"></v-skeleton-loader>
		<v-card outlined v-else class="wiki-editor">
			<v-textarea outlined name="input-7-4" label="edit" rows="20" class="wiki-editor" v-model="wikiEditor"></v-textarea>

			<v-card-text>

				条目分类
				<v-chip v-for="item in wikiCategory" :key="item" class="ma-1" color="blue" label text-color="white">
					<v-icon left>
						mdi-label
					</v-icon>
					{{ item }}
					<v-icon right @click="removeChip(item)" small>
						mdi-close
					</v-icon>
				</v-chip>

				<v-chip label text-color="white">
					<v-icon left>
						mdi-label
					</v-icon>

					<v-text-field dense :placeholder="tagPlaceholder" v-model="newTag" style="max-width:100px;"
						:rules="tagRules" @keydown.enter="addChip()"></v-text-field>

					<v-icon right @click="addChip()" small>
						mdi-plus
					</v-icon>

				</v-chip>

			</v-card-text>

			<v-card-text>
				常用理由：?
				<v-text-field label="编辑摘要：简要描述你的更改" outlined dense class="edit-summary" v-model="editSummary"></v-text-field>
				<div class="license-notification-text">当你点击<strong>提交修改</strong>时，就代表你同意本站的协议，同时，也代表你同意依据CC BY-NC-SA 3.0
					CN授权共享你的贡献。</div>

			</v-card-text>

			<v-card-actions>
				<v-btn depressed color="primary" @click="submitWiki()">
					提交修改
				</v-btn>
				<v-btn depressed outlined>
					预览
				</v-btn>
				<v-btn depressed outlined color="red">
					取消
				</v-btn>
			</v-card-actions>

		</v-card>

	</v-col>
</template>

<script>
import wikititle from '@/components/wikititle.vue'
import axios from 'axios'

export default {
	data: () => ({

		loading: false,

		title: '',

		wikiEditor: '',
		editSummary: '',
		wikiCategory: [],

		item: '',

		newTag: '',
		tagRules: [
			v => !!v,
			v => (v && v.length <= 100) || "tag长度必须小于20位"
		],
		tagPlaceholder: 'NEW'

	}),

	async mounted() {

		this.title = this.$route.params.pathMatch

		this.loading = true

		this.fetchWikiByTitle(this.$globalApiURL, this.title).then((row) => {

			this.wikiEditor = row.content
			this.wikiCategory = row.category

		}).catch(e => {

			if (e.code != 'ERR_BAD_REQUEST') {

				this.$throwError('editor', 'Acquisition of SORCE Wiki Pages', e)

			}

		}).finally(() => {

			this.loading = false

		})

	},

	methods: {

		async submitWiki() {

			try {
				let res = await this.updateWikiByTitle(this.$globalApiURL, this.title)

				if(res.data.errorCode == 200) window.location.href = '/#/' + this.title

			} catch (error) {
				this.$throwError('editor', 'Sending Request to Server', error)
			}

		},

		async fetchWikiByTitle(apiURL, title) {
			try {
				const response = await axios.get(`${apiURL}/wiki?title=${title}&source=true`);
				return {
					content: response.data.pages.content,
					category: response.data.categories
				};
			} catch (error) {
				throw error;
			}
		},

		async updateWikiByTitle(apiURL, title) {
			const username = this.$store.state.userStatus.username
			const session = this.$store.state.userStatus.session

			try {
				let res =  await axios.post(`${apiURL}/wiki?title=${title}`, {
						content: this.wikiEditor,
						comment: this.editSummary,
						categories: this.wikiCategory.join(',')
					},
					{
					headers: {
						username: username,
						session: session
					},
				});

				return res

			} catch (error) {
				throw error;
			}
		},

		addChip() {

			if (this.isStringInArray(this.wikiCategory, this.newTag)) {

				this.newTag = ''
				this.tagPlaceholder = '标签重复！'

				return

			}

			this.wikiCategory.push(this.newTag)
			this.newTag = ''

		},

		removeChip(removeItem){

			this.wikiCategory = this.wikiCategory.filter(item => item !== removeItem)

		},

		isStringInArray(array, searchString) {
			const pattern = new RegExp(searchString, 'i'); // 创建不区分大小写的正则表达式

			for (let i = 0; i < array.length; i++) {
				if (pattern.test(array[i])) {
					return true; // 找到匹配的字符串，返回 true
				}
			}

			return false; // 未找到匹配的字符串，返回 false
		}

	},

	components: {
		wikititle
	}

}
</script>