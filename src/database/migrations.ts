import {
  schemaMigrations,
  createTable,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    // Initial migration is handled by the schema
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'cached_pals',
          columns: [
            {name: 'palshub_id', type: 'string', isIndexed: true},
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string', isOptional: true},
            {name: 'thumbnail_url', type: 'string', isOptional: true},
            {name: 'creator_id', type: 'string'},
            {name: 'creator_name', type: 'string', isOptional: true},
            {name: 'creator_avatar_url', type: 'string', isOptional: true},
            {name: 'protection_level', type: 'string'},
            {name: 'price_cents', type: 'number'},
            {name: 'allow_fork', type: 'boolean'},
            {name: 'average_rating', type: 'number', isOptional: true},
            {name: 'review_count', type: 'number'},
            {name: 'is_owned', type: 'boolean'},
            {name: 'categories', type: 'string'}, // JSON array
            {name: 'tags', type: 'string'}, // JSON array
            {name: 'system_prompt', type: 'string', isOptional: true},
            {name: 'model_settings', type: 'string'}, // JSON object
            {name: 'cached_at', type: 'number'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'user_library',
          columns: [
            {name: 'user_id', type: 'string', isIndexed: true},
            {name: 'palshub_id', type: 'string', isIndexed: true},
            {name: 'purchased_at', type: 'number'},
            {name: 'purchase_id', type: 'string', isOptional: true},
            {name: 'is_downloaded', type: 'boolean'},
            {name: 'download_path', type: 'string', isOptional: true},
            {name: 'created_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'sync_status',
          columns: [
            {name: 'entity_type', type: 'string', isIndexed: true},
            {name: 'entity_id', type: 'string', isOptional: true},
            {name: 'last_sync', type: 'number'},
            {name: 'sync_version', type: 'string', isOptional: true},
            {name: 'status', type: 'string'},
            {name: 'error_message', type: 'string', isOptional: true},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
      ],
    },
    // Migration to version 3: Add local_pals table
    {
      toVersion: 3,
      steps: [
        createTable({
          name: 'local_pals',
          columns: [
            {name: 'name', type: 'string'},
            {name: 'system_prompt', type: 'string'},
            {name: 'original_system_prompt', type: 'string', isOptional: true},
            {name: 'is_system_prompt_changed', type: 'boolean'},
            {name: 'use_ai_prompt', type: 'boolean'},
            {name: 'default_model', type: 'string', isOptional: true}, // JSON stringified
            {name: 'prompt_generation_model', type: 'string', isOptional: true}, // JSON stringified
            {name: 'generating_prompt', type: 'string', isOptional: true},
            {name: 'color', type: 'string', isOptional: true}, // JSON stringified [string, string]
            {name: 'capabilities', type: 'string'}, // JSON stringified PalCapabilities
            {name: 'parameters', type: 'string'}, // JSON stringified Record<string, any>
            {name: 'parameter_schema', type: 'string'}, // JSON stringified ParameterDefinition[]
            {name: 'source', type: 'string'}, // 'local' | 'palshub'
            {name: 'palshub_id', type: 'string', isOptional: true},
            {name: 'creator_info', type: 'string', isOptional: true}, // JSON stringified
            {name: 'categories', type: 'string', isOptional: true}, // JSON stringified string[]
            {name: 'tags', type: 'string', isOptional: true}, // JSON stringified string[]
            {name: 'rating', type: 'number', isOptional: true},
            {name: 'review_count', type: 'number', isOptional: true},
            {name: 'protection_level', type: 'string', isOptional: true},
            {name: 'price_cents', type: 'number', isOptional: true},
            {name: 'is_owned', type: 'boolean', isOptional: true},
            {name: 'generation_settings', type: 'string', isOptional: true}, // JSON stringified
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
      ],
    },
    // Migration to version 4: Add description column to local_pals
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'local_pals',
          columns: [{name: 'description', type: 'string', isOptional: true}],
        }),
      ],
    },
    // Migration to version 5: Add thumbnail_url column to local_pals
    {
      toVersion: 5,
      steps: [
        addColumns({
          table: 'local_pals',
          columns: [{name: 'thumbnail_url', type: 'string', isOptional: true}],
        }),
      ],
    },
    // Migration to version 6: Add exam prep tables
    {
      toVersion: 6,
      steps: [
        createTable({
          name: 'resources',
          columns: [
            {name: 'title', type: 'string'},
            {name: 'subject', type: 'string', isIndexed: true},
            {name: 'description', type: 'string', isOptional: true},
            {name: 'file_name', type: 'string'},
            {name: 'file_path', type: 'string'},
            {name: 'file_size', type: 'number', isOptional: true},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'quiz_sessions',
          columns: [
            {name: 'title', type: 'string'},
            {name: 'subject', type: 'string', isIndexed: true},
            {name: 'resource_ids', type: 'string'},
            {name: 'questions', type: 'string'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'quiz_results',
          columns: [
            {name: 'quiz_session_id', type: 'string', isIndexed: true},
            {name: 'quiz_title', type: 'string'},
            {name: 'subject', type: 'string', isIndexed: true},
            {name: 'score', type: 'number'},
            {name: 'total_questions', type: 'number'},
            {name: 'percentage', type: 'number'},
            {name: 'answers', type: 'string'},
            {name: 'time_taken_seconds', type: 'number', isOptional: true},
            {name: 'created_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'subject_progress',
          columns: [
            {name: 'subject', type: 'string', isIndexed: true},
            {name: 'quizzes_taken', type: 'number'},
            {name: 'average_score', type: 'number'},
            {name: 'questions_attempted', type: 'number'},
            {name: 'correct_answers', type: 'number'},
            {name: 'time_spent_seconds', type: 'number'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'resource_summaries',
          columns: [
            {name: 'resource_id', type: 'string', isIndexed: true},
            {name: 'summary', type: 'string'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
      ],
    },
  ],
});
