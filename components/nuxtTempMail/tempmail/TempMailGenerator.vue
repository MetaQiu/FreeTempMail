<template>
    <div class="bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 min-h-screen relative overflow-hidden">


      <!-- 背景装饰 -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-xl"></div>
        <div class="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-green-200 rounded-full blur-xl"></div>
        <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-300 to-blue-300 rounded-full blur-2xl opacity-50"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <!-- 标题区域 -->
        <div class="text-center mb-12">
          <!-- 退出登录按钮 -->
          <div v-if="showLogoutButton" class="flex justify-end mb-4">
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1 disabled:opacity-50"
            >
              <svg v-if="!isLoggingOut" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoggingOut ? $t('auth.loggingOut') : $t('auth.logout') }}
            </button>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent mb-6">
            {{ $t('tempmail.title') }}
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {{ $t('tempmail.description') }}
          </p>
        </div>
  
        <!-- 邮箱生成区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <!-- 邮箱生成卡片 -->
          <div class="lg:col-span-1">
            <Card class="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-h-[500px]">
              <CardHeader class="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle class="text-gray-900 text-xl font-semibold">{{ $t('tempmail.generator.title') }}</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4 p-6">
                <!-- 邮箱生成器 -->
                <div class="space-y-4">
                  <!-- 自定义邮箱前缀 -->
                  <div>
                    <label class="text-sm text-gray-600 mb-2 block font-medium">{{ $t('tempmail.generator.customPrefix') }}</label>
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="customPrefix"
                        type="text"
                        :placeholder="$t('tempmail.generator.prefixPlaceholder')"
                        class="flex-1 px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        maxlength="15"
                        @input="validatePrefix"
                      />
                      <button
                        v-if="customPrefix"
                        @click="customPrefix = ''"
                        class="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                        :title="$t('tempmail.generator.clearPrefix')"
                      >
                        ✕
                      </button>
                      <span class="text-gray-500 text-sm">{{ customPrefix.length }}/15</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-1">{{ $t('tempmail.generator.prefixHint') }}</p>
                  </div>

                  <!-- 域名选择 -->
                  <div>
                    <label class="text-sm text-gray-600 mb-2 block font-medium">{{ $t('tempmail.generator.selectDomain') }}</label>
                    <div class="relative">
                      <select
                        v-model="selectedDomain"
                        class="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                      >
                        <option v-for="domain in availableDomains" :key="domain" :value="domain">
                          {{ domain }}
                        </option>
                      </select>
                      <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- 邮箱预览 -->
                  <div v-if="emailPreview && !currentEmail" class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p class="text-sm text-blue-600 mb-1">{{ $t('tempmail.generator.previewEmail') }}</p>
                    <p class="font-mono text-sm text-blue-800">{{ emailPreview }}</p>
                  </div>

                  <!-- 当前邮箱显示 -->
                  <div v-if="currentEmail" class="p-4 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-lg border border-green-200 shadow-inner">
                    <div class="flex items-center justify-between">
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-600 mb-1 font-medium">{{ $t('tempmail.generator.currentEmailLabel') }}</p>
                        <p class="text-gray-900 font-mono text-sm truncate bg-white px-2 py-1 rounded border border-green-100" :title="currentEmail">
                          {{ currentEmail }}
                        </p>
                      </div>
                      <Button
                        @click="copyEmail"
                        size="sm"
                        variant="ghost"
                        class="ml-2 text-green-600 hover:text-green-700 hover:bg-green-100 transition-all duration-200 transform hover:scale-110"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <!-- 无邮箱时的提示 -->
                  <div v-if="!currentEmail" class="p-4 bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 rounded-lg border border-blue-200">
                    <div class="text-center">
                      <svg class="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <p class="text-sm text-blue-700 font-medium mb-1">{{ $t('tempmail.generator.startUsing') }}</p>
                      <p class="text-xs text-blue-600">{{ $t('tempmail.generator.startDescription') }}</p>
                    </div>
                  </div>
                </div>
  
                <!-- 操作按钮 -->
                <div class="space-y-3">
                  <Button
                    @click="generateNewEmail"
                    :class="[
                      'w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5',
                      showSuccessButton
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                    ]"
                    :disabled="isGenerating || showSuccessButton"
                  >
                    <svg v-if="!isGenerating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    {{
                      isGenerating ? $t('tempmail.generator.generating') :
                      showSuccessButton ? $t('tempmail.generator.success') :
                      (customPrefix.trim() ? $t('tempmail.generator.useThisEmail') : $t('tempmail.generator.generateNewEmail'))
                    }}
                  </Button>

                  <!-- 查询邮箱功能 -->
                  <div class="space-y-2">
                    <input
                      v-model="queryEmail"
                      type="text"
                      :placeholder="$t('tempmail.inbox.queryEmailPlaceholder')"
                      class="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      @keyup.enter="queryEmails"
                    />
                    <Button
                      @click="queryEmails"
                      variant="outline"
                      class="w-full border-blue-300 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:border-blue-400 shadow-md hover:shadow-lg transition-all duration-300"
                      :disabled="isQuerying || !queryEmail"
                    >
                      <svg v-if="!isQuerying" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      {{ isQuerying ? $t('tempmail.inbox.querying') : $t('tempmail.inbox.queryButton') }}
                    </Button>
                  </div>

                  <Button
                    @click="refreshEmails"
                    variant="outline"
                    class="w-full border-green-300 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-400 shadow-md hover:shadow-lg transition-all duration-300"
                    :disabled="isRefreshing"
                  >
                    <svg v-if="!isRefreshing" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    {{ isRefreshing ? $t('tempmail.refreshing') : $t('tempmail.refresh') }}
                  </Button>
                </div>
  
                <!-- 统计信息 -->
                <div class="pt-4 border-t border-green-200">
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200">
                      <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{{ emails.length }}</p>
                      <p class="text-xs text-gray-500">{{ $t('tempmail.stats.totalEmails') }}</p>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                      <p class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{{ unreadCount }}</p>
                      <p class="text-xs text-gray-500">{{ $t('tempmail.stats.unread') }}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
  
          <!-- 邮件列表区域 -->
          <div class="lg:col-span-2">
            <Card class="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[500px]">
              <CardHeader class="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-gray-900 text-xl font-semibold">{{ $t('tempmail.inbox.title') }}</CardTitle>
                  <div class="text-sm text-gray-500 bg-white px-2 py-1 rounded border border-green-200">
                    {{ $t('tempmail.inbox.lastUpdate') }}: {{ lastUpdateTime }}
                  </div>
                </div>
              </CardHeader>
              <CardContent class="p-6">
                <!-- 邮件列表 -->
                <div class="space-y-3 min-h-[500px] max-h-[600px] overflow-y-auto">
                  <!-- 没有当前邮箱时的提示 -->
                  <div v-if="!currentEmail" class="text-center py-12">
                    <svg class="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                    <p class="text-gray-600 text-lg">{{ $t('tempmail.inbox.noEmailboxTitle') }}</p>
                    <p class="text-gray-500 text-sm mt-2">{{ $t('tempmail.inbox.noEmailboxDescription') }}</p>
                  </div>

                  <!-- 有邮箱但没有邮件时的提示 -->
                  <div v-else-if="emails.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-600 text-lg">{{ $t('tempmail.inbox.empty') }}</p>
                    <p class="text-gray-500 text-sm mt-2">{{ $t('tempmail.inbox.emptyDescription') }}</p>
                  </div>
  
                  <div
                    v-for="email in emails"
                    :key="email.id"
                    @click="selectEmail(email)"
                    class="p-4 border border-green-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transform hover:scale-[1.02] hover:shadow-md"
                    :class="{
                      'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg': selectedEmail?.id === email.id,
                      'bg-white shadow-sm': !email.read,
                      'bg-gray-50': email.read
                    }"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <div v-if="!email.read" class="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                          <p class="text-gray-900 font-medium truncate">{{ email.subject }}</p>
                        </div>
                        <p class="text-sm text-gray-600 truncate">{{ email.sender }}</p>
                        <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ email.preview }}</p>
                      </div>
                      <div class="ml-4 text-right flex-shrink-0">
                        <p class="text-xs text-gray-500">{{ formatEmailTime(email.receivedAt) }}</p>
                        <div class="flex items-center gap-1 mt-1">
                          <svg v-if="email.hasAttachment" class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  
        <!-- 邮件详情区域 -->
        <div v-if="selectedEmail" class="mb-8">
          <Card class="bg-white/90 backdrop-blur-sm border-green-200 shadow-2xl">
            <CardHeader class="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-t-lg">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <CardTitle class="text-gray-900 text-xl mb-2 font-semibold">{{ selectedEmail.subject }}</CardTitle>
                  <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.from') }}:</span> {{ selectedEmail.sender }}</p>
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.to') }}:</span> {{ currentEmail }}</p>
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.time') }}:</span> {{ formatFullTime(selectedEmail.receivedAt) }}</p>
                  </div>
                </div>
                <Button
                  @click="closeEmail"
                  variant="ghost"
                  size="sm"
                  class="text-gray-500 hover:text-gray-700 hover:bg-green-100 transition-all duration-200 transform hover:scale-110"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent class="p-6">
              <div class="prose prose-gray max-w-none">
                <div v-html="selectedEmail.content" class="text-gray-700 leading-relaxed"></div>
              </div>
              
              <!-- 附件列表 -->
              <div v-if="selectedEmail.attachments && selectedEmail.attachments.length > 0" class="mt-6 pt-6 border-t border-green-200">
                <h4 class="text-gray-900 font-medium mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                  {{ $t('tempmail.email.attachments') }} ({{ selectedEmail.attachments.length }})
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="attachment in selectedEmail.attachments"
                    :key="attachment.name"
                    class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p class="text-gray-900 font-medium">{{ attachment.name }}</p>
                        <p class="text-sm text-gray-500">{{ attachment.size }}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      class="border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 transition-all duration-200"
                    >
                      {{ $t('tempmail.email.download') }}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  
      <!-- 操作成功提示 -->
      <div
        v-if="showCopySuccess"
        class="fixed top-20 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ $t('common.operationSuccess') }}
        </div>
      </div>

      <!-- API通知提示 -->
      <div
        v-if="showApiNotification"
        :class="[
          'fixed top-32 right-4 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform',
          apiNotificationType === 'success' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-red-600'
        ]"
      >
        <div class="flex items-center gap-2">
          <svg v-if="apiNotificationType === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          {{ apiNotificationMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '#components'
import { Button } from '#components'
import { formatTime, copyToClipboard } from '~/lib/utils'

// 国际化
const { t } = useI18n()
  
  // 邮件类型定义
  interface EmailAttachment {
    name: string
    size: string
  }
  
  interface Email {
    id: string
    subject: string
    sender: string
    preview: string
    content: string
    receivedAt: Date
    read: boolean
    hasAttachment: boolean
    attachments?: EmailAttachment[]
  }
  
  // 响应式数据
  const currentEmail = ref('')
  const emails = ref<Email[]>([])
  const selectedEmail = ref<Email | null>(null)
  const isGenerating = ref(false)
  const isRefreshing = ref(false)
  const showCopySuccess = ref(false)
  const lastUpdateTime = ref('')
  const lastCheckTime = ref('')

  // 查询邮件相关
  const queryEmail = ref('')
  const isQuerying = ref(false)

  // 邮箱生成相关
  const customPrefix = ref('')
  const config = useRuntimeConfig()
  const showSuccessButton = ref(false)

  // 退出登录相关
  const isLoggingOut = ref(false)
  const showLogoutButton = ref(false)

  // 通知相关 - 使用简单的通知系统
  const showApiNotification = ref(false)
  const apiNotificationMessage = ref('')
  const apiNotificationType = ref<'success' | 'error'>('success')

  // 显示API通知
  const showNotification = (message: string, type: 'success' | 'error' = 'success', duration: number = 3000) => {
    apiNotificationMessage.value = message
    apiNotificationType.value = type
    showApiNotification.value = true

    setTimeout(() => {
      showApiNotification.value = false
    }, duration)
  }

  // API 认证 - 暂时注释，等待 Nuxt 自动导入生效
  // const { $authFetch } = useApiAuth()

  // 创建带认证的 fetch 函数
  const $authFetch = async (url: string, options: any = {}) => {
    const password = import.meta.client ? sessionStorage.getItem('access_password') : null
    const headers = {
      ...options.headers,
      ...(password ? { 'x-api-password': password } : {})
    }

    return await $fetch(url, {
      ...options,
      headers
    })
  }

  // 注意：密码保护现在完全由服务端中间件处理
  // 如果用户能看到这个页面，说明已经通过了服务端的认证检查
  // API 密码在登录时已经自动设置

  // 检查是否需要显示退出登录按钮
  const checkShowLogoutButton = () => {
    // 始终显示退出登录按钮
    showLogoutButton.value = true
  }

  // 处理API认证错误的通用方法
  const handleApiError = async (error: any, showAlert: boolean = true) => {
    console.error('API Error:', error)

    // 检查多种可能的401错误格式
    const is401Error = error.statusCode === 401 ||
                      error.status === 401 ||
                      (error.data && error.data.statusCode === 401) ||
                      (error.response && error.response.status === 401) ||
                      error.message?.includes('401')

    if (is401Error) {
      // 401认证错误，显示通知并跳转到登录页面
      if (showAlert) {
        const message = t('auth.loginRequired') + ' - ' + t('notifications.authorizationFailed')
        showNotification(message, 'error', 5000)
      }

      // 清除认证信息
      if (import.meta.client) {
        sessionStorage.removeItem('access_password')
        localStorage.removeItem('access_password')
        sessionStorage.removeItem('tempmail_auth')
        sessionStorage.removeItem('tempmail_auth_time')
      }

      // 延迟跳转，让用户看到通知
      setTimeout(async () => {
        await navigateTo('/login')
      }, 2000)

      return true // 表示已处理401错误
    }

    return false // 表示不是401错误
  }

  // 退出登录方法
  const handleLogout = async () => {
    if (isLoggingOut.value) return

    isLoggingOut.value = true

    try {
      // 调用退出登录 API
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })

      // 清除前端存储的 API 密码
      if (import.meta.client) {
        sessionStorage.removeItem('access_password')
        localStorage.removeItem('access_password')
      }

      // 跳转到登录页面
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      // 即使 API 调用失败，也清除本地数据并跳转
      if (import.meta.client) {
        sessionStorage.removeItem('access_password')
        localStorage.removeItem('access_password')
      }
      await navigateTo('/login')
    } finally {
      isLoggingOut.value = false
    }
  }

  // 从环境变量获取可用域名列表
  const getAvailableDomains = () => {
    const domainsStr = config.public.availableDomains
    if (domainsStr && typeof domainsStr === 'string') {
      return domainsStr.split(',').map(domain => domain.trim()).filter(domain => domain)
    }
    // 如果环境变量未配置，使用默认域名
    return [config.public.domainUrl || 'metaqiu.tech']
  }

  const availableDomains = ref(getAvailableDomains())
  const selectedDomain = ref(availableDomains.value[0] || 'metaqiu.tech')
  
  // 计算属性
  const unreadCount = computed(() => emails.value.filter((email: Email) => !email.read).length)

  // 邮箱预览
  const emailPreview = computed(() => {
    if (customPrefix.value.trim()) {
      return `${customPrefix.value.trim()}@${selectedDomain.value}`
    }
    return ''
  })
  
  // 自动刷新定时器
  let refreshInterval: ReturnType<typeof setInterval> | null = null
  
  // 方法
  const generateNewEmail = async () => {
    isGenerating.value = true

    try {
      // 生成邮箱前缀
      let prefix = customPrefix.value.trim()
      if (!prefix) {
        // 如果没有自定义前缀，生成随机前缀
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
        const length = Math.floor(Math.random() * 5) + 6 // 6-10位长度
        prefix = ''
        for (let i = 0; i < length; i++) {
          prefix += chars.charAt(Math.floor(Math.random() * chars.length))
        }
      }

      // 生成完整邮箱地址
      const newEmail = `${prefix}@${selectedDomain.value}`
      currentEmail.value = newEmail
      emails.value = [] // 清空旧邮件
      selectedEmail.value = null
      lastCheckTime.value = new Date().toISOString()
      updateLastUpdateTime()

      // 立即获取新邮箱的邮件
      await refreshEmails()

      // 显示成功状态
      showSuccessButton.value = true
      setTimeout(() => {
        showSuccessButton.value = false
      }, 2000) // 2秒后恢复正常状态

      // 如果使用了自定义前缀，保留它；如果是随机生成的，则清空输入框
      if (customPrefix.value.trim() === '') {
        // 用户没有输入自定义前缀，是随机生成的，保持输入框为空
      } else {
        // 用户输入了自定义前缀，保留在输入框中以便用户知道使用了什么前缀
        // customPrefix.value 保持不变
      }

    } catch (error) {
      console.error('Generate email failed:', error)
    } finally {
      isGenerating.value = false
    }
  }
  
  const refreshEmails = async () => {
    isRefreshing.value = true
    
    try {
      if (!currentEmail.value) {
        return
      }
      
      const readEmailIds = new Set(emails.value.filter((e: Email) => e.read).map((e: Email) => e.id))
      
      const response = await $authFetch(`/api/tempmail/emails?email=${encodeURIComponent(currentEmail.value)}`) as any
      
      if (response.success) {
        const newEmails = response.emails.map((e: any) => ({
          ...e,
          id: String(e.id), // 确保 id 是字符串类型
          receivedAt: new Date(e.receivedAt),
          read: readEmailIds.has(String(e.id))
        }))
        emails.value = newEmails
        lastCheckTime.value = new Date().toISOString()
        updateLastUpdateTime()

        // 显示成功通知
        showNotification(t('notifications.emailsRefreshed', { count: response.emails.length }), 'success', 2000)
      }
    } catch (error) {
      const handled = await handleApiError(error, true)
      if (!handled) {
        console.error('Refresh emails failed:', error)
      }
    } finally {
      isRefreshing.value = false
    }
  }
  
  const pollNewEmails = async () => {
    if (!currentEmail.value) {
      return
    }

    try {
      const params = new URLSearchParams({
        email: currentEmail.value
      })

      if (lastCheckTime.value) {
        params.append('lastCheck', lastCheckTime.value)
      }

      const response = await $authFetch(`/api/tempmail/poll?${params.toString()}`) as any

      if (response.success) {
        // 无论是否有新邮件，都更新最后更新时间
        updateLastUpdateTime()

        if (response.newEmails.length > 0) {
          const existingEmailIds = new Set(emails.value.map((e: Email) => e.id))
          // 将新邮件添加到现有邮件列表的开头，并过滤掉重复项
          const newEmailsWithDate = response.newEmails
            .filter((e: any) => !existingEmailIds.has(String(e.id)))
            .map((e: any) => ({
              ...e,
              id: String(e.id), // 确保 id 是字符串类型
              receivedAt: new Date(e.receivedAt)
            }))

          if (newEmailsWithDate.length > 0) {
            emails.value = [...newEmailsWithDate, ...emails.value]

            // 显示新邮件通知
            showNotification(t('notifications.newEmailsReceived', { count: newEmailsWithDate.length }), 'success', 3000)
          } else {
            // 没有新邮件时也显示通知
            showNotification(t('notifications.emailCheckComplete'), 'success', 2000)
          }
        } else {
          // 没有新邮件时显示通知
          showNotification(t('notifications.emailCheckComplete'), 'success', 2000)
        }
        lastCheckTime.value = response.lastChecked
      }
    } catch (error) {
      const handled = await handleApiError(error, true) // poll接口也显示401错误通知
      if (!handled) {
        console.error('Poll new emails failed:', error)
        showNotification(t('notifications.emailCheckFailed'), 'error', 3000)
      }
    }
  }
  
  const copyEmail = async () => {
    const success = await copyToClipboard(currentEmail.value)
    if (success) {
      showCopySuccess.value = true
      setTimeout(() => {
        showCopySuccess.value = false
      }, 2000)
    }
  }

  const queryEmails = async () => {
    if (!queryEmail.value.trim()) {
      return
    }

    isQuerying.value = true

    try {
      const response = await $authFetch(`/api/tempmail/emails?email=${encodeURIComponent(queryEmail.value.trim())}`) as any

      if (response.success) {
        // 切换到查询的邮箱
        currentEmail.value = queryEmail.value.trim()

        const newEmails = response.emails.map((e: any) => ({
          ...e,
          id: String(e.id), // 确保 id 是字符串类型
          receivedAt: new Date(e.receivedAt),
          read: false
        }))
        emails.value = newEmails
        lastCheckTime.value = new Date().toISOString()
        updateLastUpdateTime()

        // 显示成功消息
        showCopySuccess.value = true
        setTimeout(() => {
          showCopySuccess.value = false
        }, 2000)

        // 清空查询输入框
        queryEmail.value = ''
      }
    } catch (error: any) {
      const handled = await handleApiError(error, true)
      if (!handled) {
        console.error('Query emails failed:', error)
        const { $t } = useNuxtApp() as any
        alert($t('common.queryEmailFailed'))
      }
    } finally {
      isQuerying.value = false
    }
  }
  
  const selectEmail = (email: Email) => {
    selectedEmail.value = email
    if (!email.read) {
      email.read = true
    }
  }
  
  const closeEmail = () => {
    selectedEmail.value = null
  }
  

  
  const formatEmailTime = (date: Date) => {
    try {
      const { $t } = useNuxtApp() as any
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (!$t) {
        // 如果 $t 不可用，使用默认文本
        if (diffMinutes < 1) return '刚刚'
        if (diffMinutes < 60) return `${diffMinutes}分钟前`
        if (diffHours < 24) return `${diffHours}小时前`
        if (diffDays < 7) return `${diffDays}天前`
        return date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
      }

      if (diffMinutes < 1) return $t('common.justNow')
      if (diffMinutes < 60) return `${diffMinutes}${$t('common.minutesAgo')}`
      if (diffHours < 24) return `${diffHours}${$t('common.hoursAgo')}`
      if (diffDays < 7) return `${diffDays}${$t('common.daysAgo')}`

      return date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
    } catch (error) {
      console.error('formatEmailTime error:', error)
      // 如果出错，返回简单的时间格式
      return date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
    }
  }
  
  const formatFullTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Shanghai'
    })
  }
  
  const updateLastUpdateTime = () => {
    lastUpdateTime.value = formatTime(new Date())
  }

  const validatePrefix = (event: Event) => {
    const target = event.target as HTMLInputElement
    // 只允许字母、数字、点、连字符和下划线
    const validChars = /^[a-zA-Z0-9._-]*$/
    if (!validChars.test(target.value)) {
      // 移除无效字符
      customPrefix.value = target.value.replace(/[^a-zA-Z0-9._-]/g, '')
    }
    // 输入发生变化时重置按钮状态
    showSuccessButton.value = false
  }

  // 监听域名变化
  watch(selectedDomain, () => {
    showSuccessButton.value = false
  })

  // 监听前缀变化
  watch(customPrefix, () => {
    showSuccessButton.value = false
  })
  
  // 生命周期
  onMounted(async () => {
    // 检查是否显示退出登录按钮
    checkShowLogoutButton()

    // 不自动生成邮箱，让用户手动选择
    // await generateNewEmail()

    // 设置自动轮询检查新邮件（只有当有当前邮箱时才轮询）
    refreshInterval = setInterval(async () => {
      if (currentEmail.value) {
        await pollNewEmails()
      }
    }, 10000) // 每10秒检查一次新邮件
  })
  
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
  })
  </script>
  
  <style scoped>
  /* 隐藏滚动条但保持滚动功能 */
  .overflow-y-auto {
    /* Firefox */
    scrollbar-width: none;
    /* IE and Edge */
    -ms-overflow-style: none;
  }

  /* Webkit browsers (Chrome, Safari, Edge) */
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* 限制文本行数 */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 背景动画 */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  </style>