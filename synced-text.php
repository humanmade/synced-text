<?php
/**
 * Plugin Name: Synced Text
 * Description: A block editor sidebar plugin text snippets that can be inserted inline into content and synchronised across the site.
 * Version: 1.0.0
 * Author: Human Made Limited
 * Author URI: https://humanmade.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: seon
 * Domain Path: /languages
 */

namespace SyncedText;

add_action( 'enqueue_block_editor_assets', function() : void {
	$asset = require __DIR__ . '/build/index.asset.php';
	wp_enqueue_script(
		'synced-text',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version']
	);
} );

/**
 * Fires when preparing to serve a REST API request.
 */
add_action( 'rest_api_init', function () : void {
	register_setting( 'writing', 'syncedText', [
		'type'              => 'object',
		'label'             => __( 'Synced Text', 'synced-text' ),
		'description'       => __( 'A set of inline text values that can be inserted into posts and kept in sync across the site', 'synced-text' ),
		'sanitize_callback' => function ( $value ) {
			if ( ! is_array( $value ) ) {
				$value = [];
			}

			$value = array_map( 'sanitize_text_field', $value );

			return $value;
		},
		'show_in_rest' => [
			'schema' => [
				'type' => 'object',
				'patternProperties' => [
					'^[a-z0-9_-]+$' => [
						'type' => 'string',
					],
				],
			]
		],
	] );
} );

/**
 * Filters the content of a single block.
 *
 * @param string $block_content The block content.
 * @return string The block content.
 */
add_filter( 'render_block', function( string $block_content ) : string {
	$synced_text = get_option( 'syncedText', [] );

	if ( ! is_array( $synced_text ) ) {
		$synced_text = (array) $synced_text;
	}

	$block_content = str_replace(
		array_map( function ( $key ) {
			return sprintf( '{%s}', $key );
		}, array_keys( $synced_text ) ),
		$synced_text,
		$block_content
	);

	return $block_content;
}, 10, 3 );
